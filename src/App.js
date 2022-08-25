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
import { Switch, Route } from "react-router-dom";




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

    // Get location using navigator
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
      'Wait, we are fetching you location...'
    );

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      var crd = pos.coords;
    
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function errors(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    

   if( navigator.geolocation){
    console.log("great")
    navigator.permissions
    .query({ name: "geolocation" })
    .then(function (result) {
      if (result.state === "granted") {
        console.log(result.state);
        console.log(result);
        //If granted then you can directly call your function here
        navigator.geolocation.getCurrentPosition(success, errors, options);
        // let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        // setDisplayCurrentAddress(address);
      } else if (result.state === "prompt") {
        console.log(result.state);
        navigator.geolocation.getCurrentPosition(success, errors, options);
        
      } else if (result.state === "denied") {
        //If denied then you have to show instructions to enable location
      }
      result.onchange = function () {
        console.log(result.state);
      };
    });
} else {
  alert("Sorry Not available!");
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
          let url =`https://api.petfinder.com/v2/animals?limit=100${catsQuery}${dogsQuery}${kidsQuery}`

  
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


//Page Switching
const [selectedAnimal,setSelectedAnimal]=useState({name:"",id:"",primary_photo_cropped:{full:""}})

const [page, setPage] = useState("/")
   

  return (
    <div style={{'background-color': "white"}} className="App">
      <Header />
      <NavBar onChangePage={setPage}/>
      <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/inquiries">
                <Inquiries selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} />
                </Route>
                <Route exact path="/">
                <PetList  setSelectedAnimal={setSelectedAnimal} page={page} setPage={setPage} animals={animals} includeCats={includeCats} includeDogs={includeDogs} includeKids={includeKids} handleCatClick={handleCatClick} handleDogClick={handleDogClick} handleKidClick={handleKidClick} />
                </Route>
                <Route path="*">
                <NotFound />
                </Route>
            </Switch>
   </div>
  );
}

export default App;
