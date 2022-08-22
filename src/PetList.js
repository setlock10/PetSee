import PetCard from "./PetCard";

function PetList({animals}){

    let petCards= animals.map(animal=>{
        if(animal.primary_photo_cropped!==null)
        return <PetCard key={animal.id} animal={animal} />
    })

    return(
        <div>{petCards}</div>
    )


}

export default PetList;