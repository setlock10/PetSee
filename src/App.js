import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import bkrnd from './images/pet-background-cartoon.jpg'
import './App.css';
import Header from './Header';
import PetList from './PetList';
import {key,secret} from './keys.js'
import About from "./About";
import Inquiries from "./Inquiries";
import NavBar from './NavBar';
import NotFound from './NotFound';




function App() {

    // Setting State and Callback functions for the checkboxes
    const [includeCats,setIncludeCats] = useState(true)
    const [includeDogs,setIncludeDogs] = useState(true)
    const [includeKids,setIncludeKids] = useState(false)

    function handleCatClick() {
      setIncludeCats(!includeCats)
    }

    function handleDogClick() {
      setIncludeDogs(!includeDogs)
    }

    function handleKidClick() {
      setIncludeKids(!includeKids)
    }


    // Setting State and Fetching the Pets
    const [animals,setAnimals] = useState([])
    
    // This is a POST request, because we need the API to generate a new token for us
    useEffect(()=>{
      fetch('https://api.petfinder.com/v2/oauth2/token', {
	    method: 'POST',
	    body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(res=>res.json())
        .then(data=> {

	      // Log the API data
	      //console.log('token', data);
          let kidsQuery=""
          let catsQuery=""
          let dogsQuery=""
          if ((includeCats===true)&&(includeDogs===false)) catsQuery="&type=Cat"
          if ((includeCats===false)&&(includeDogs===true)) catsQuery="&type=Dog"
          if (includeKids===true) kidsQuery="&good_with_children=true"
          let url =`https://api.petfinder.com/v2/animals?limit=50${catsQuery}${dogsQuery}${kidsQuery}`

  
	// The second fetch uses the token we received for authentication
          return fetch(url, {
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
            },[includeCats,includeDogs,includeKids])

 //Fetch Inquiries
 const [inquiryData,setInquirydata]=useState([])


 useEffect(()=>{
     fetch ('https://petsee-json-server.herokuapp.com/inquiries')
         .then(res=>res.json())
         .then(data=>{
             //console.log(data)
             setInquirydata(data)
             
         })
 },[])

//Page Switching
const [selectedAnimal,setSelectedAnimal]=useState({name:"",id:"",primary_photo_cropped:{full:""}})

const [page, setPage] = useState("/")
   
function getCurrentPage() {
  switch(page) {
      case "/":
          return <PetList  setSelectedAnimal={setSelectedAnimal} setPage={setPage} animals={animals} includeCats={includeCats} includeDogs={includeDogs} includeKids={includeKids} handleCatClick={handleCatClick} handleDogClick={handleDogClick} handleKidClick={handleKidClick} />
      case "/about":
          return <About />
      case "/inquiries":
          return <Inquiries selectedAnimal={selectedAnimal} inquiryData={inquiryData} />
      default:
          return <NotFound />
  }
}

  return (
    <div style={{'background-color': "white"}} className="App">
      <Header />
      <NavBar onChangePage={setPage}/>
      {getCurrentPage()}
   </div>
  );
}

export default App;
