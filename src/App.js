import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import PetList from './PetList';

function App() {

  var key='VkyH637uqO9blguY1x4mZZPwemXbHF6kurPHNa7SxqEIJZ3D4d'
  var secret='EQg7jvg5YIXOo2BvpsmR9KFWbXaYAKDsezQ4xH0O'


const [animals,setAnimals] = useState([])
// Call the API
// This is a POST request, because we need the API to generate a new token for us

useEffect(()=>{
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);
	// Return a second API call
	// This one uses the token we received for authentication
  // Look up query parameters at https://www.petfinder.com/developers/v2/docs/#get-animals
	//'https://api.petfinder.com/v2/animals?page=2'
  return fetch('https://api.petfinder.com/v2/animals', {
      headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
  .then (res=>res.json())
  .then (data=>{
    console.log(data.animals)
    setAnimals(data.animals)
  })
}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});
},[])




  return (
    <div className="App">
      <Header />
      <PetList animals={animals} />
    </div>
  );
}

export default App;
