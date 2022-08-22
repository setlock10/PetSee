function PetCard ({animal}){
    console.log(animal.primary_photo_cropped.full)

    return (

        <div>
            <h1>{animal.name}</h1>
            <img alt={animal.name} src={animal.primary_photo_cropped.full} />
        </div>


    )

  
}

export default PetCard;