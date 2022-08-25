import { useHistory } from "react-router-dom";

function PetCard ({page,setPage,animal,setSelectedAnimal}){
    //console.log(animal)
    let history = useHistory();
    
    function handleClick (){

        //console.log(page)
        setPage("/inquiries")
        setSelectedAnimal(animal)
        history.push(page)
    }
    return (
    <div  className="ui four wide column">
        <div  className="ui card petTile minPetTile">
            <h2>{animal.name}</h2>
            {/* <h3>{animal.status}</h3> */}
            <img className="petCardImage"   alt={animal.name} src={animal.primary_photo_cropped.full} />
            <p>{animal.gender}</p>
            <p>{animal.age}</p>
            <p>{animal.description}</p>
            <h3>{animal.tags[0]}</h3>
            <button onClick={()=>handleClick()}>Inquire</button>
        </div>
    </div>
    )
    
    }
    export default PetCard;