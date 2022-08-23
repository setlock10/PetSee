function Inquiries({selectedAnimal}){

    console.log(selectedAnimal)

    return(
        <div>
            Inquiries and Inquiry Form Goes Here
            <form className="form" >
                <label>{selectedAnimal.name}</label>
                <img height="250"  alt={selectedAnimal.name} src={selectedAnimal.primary_photo_cropped.full} />
 

            </form>
        </div>
    )



}
export default Inquiries;