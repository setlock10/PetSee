function PetCard ({animal}){
    console.log(animal)

    return (

        <div>
            <h2>{animal.name}</h2>
            <img alt={animal.name} src={animal.primary_photo_cropped.full} />
        </div>


    )

  
}

export default PetCard;