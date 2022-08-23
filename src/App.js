import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import PetList from './PetList';
import {key,secret} from './keys.js'


function App() {

 const [includeCats,setIncludeCats] = useState(true)
 const [includeDogs,setIncludeDogs] = useState(true)
 const [includeKids,setIncludeKids] = useState(false)
 
const [tokenData,setTokenData]=useState({})
const [animals,setAnimals] = useState([])
// Call the API
// This is a POST request, because we need the API to generate a new token for us

function getAnimals (){
  let url ='https://api.petfinder.com/v2/animals?limit=50'

  if ((includeCats===true)&&(includeDogs===false))  url='https://api.petfinder.com/v2/animals?limit=50&type=Cat'
  fetch(url, {
    headers: {
    'Authorization': tokenData.token_type + ' ' + tokenData.access_token,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then (res=>res.json())
.then (data=>{
  console.log(data.animals)
  setAnimals(data.animals)
})
.catch(function (err) {
// Log any errors
console.log('something went wrong', err);
});

}





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
  let url ='https://api.petfinder.com/v2/animals?limit=50'

  if ((includeCats===true)&&(includeDogs===false))  url='https://api.petfinder.com/v2/animals?limit=50&type=Cat'

	// Return a second API call
	// This one uses the token we received for authentication
  // Look up query parameters at https://www.petfinder.com/developers/v2/docs/#get-animals
	//'https://api.petfinder.com/v2/animals?page=2'
  setTokenData(data)
  return getAnimals ()
}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});
},[])

function handleCatClick() {
  setIncludeCats(!includeCats)
  
}

function handleDogClick() {
  setIncludeDogs(!includeDogs)
}

function handleKidClick() {
  setIncludeKids(!includeKids)
}




  return (
    <div className="App">
      <Header />
      <PetList animals={animals} includeCats={includeCats} includeDogs={includeDogs} includeKids={includeKids} handleCatClick={handleCatClick} handleDogClick={handleDogClick} handleKidClick={handleKidClick} />
    </div>
  );
}

export default App;
