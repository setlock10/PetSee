import PetCard from "./PetCard";

function PetList({setSelectedAnimal,setPage,animals,includeCats,includeDogs,includeKids,handleCatClick,handleDogClick,handleKidClick}){

    let petCards= animals.map(animal=>{
        if(animal.primary_photo_cropped!==null)
        return <PetCard setSelectedAnimal={setSelectedAnimal}  setPage={setPage} key={animal.id} animal={animal} />
    })

    return(
        
        <div className="petList">
            <div>
                <input onChange={()=>handleCatClick()} namme="cats" type="checkbox" checked={includeCats}/>
                <label >Cats</label>
                <input onChange={()=>handleDogClick()} namme="dogs" type="checkbox" checked={includeDogs}/>
                <label >Dogs</label>
                <input onChange={()=>handleKidClick()} namme="children" type="checkbox" checked={includeKids}/>
                <label >Good with children</label>
                
            </div>
            <div  >{petCards}</div>
        </div>
    )


}

export default PetList;