import React,{useState} from 'react';
import InquiryCard from './InquiryCard';

function Inquiries({selectedAnimal,inquiryData}){

   
    let inquiryCards=inquiryData.map(inquiry=>{
        return <InquiryCard key={inquiry.id} inquiry={inquiry} />
    })

    //Form Handling
    const [formName,setFormName]= useState("")
    const [formEmail,setFormEmail]= useState("")

    function handleNameChange(e){
        setFormName(e.target.value)
    }

    function handleEmailChange(e){
        setFormEmail(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
       
        fetch ("https://petsee-json-server.herokuapp.com/inquiries",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                name:formName,
                email:formEmail,
                petName:selectedAnimal.name,
                petId:selectedAnimal.id,
                petImage:selectedAnimal.primary_photo_cropped.full    
            })
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                
            })
            .catch(e=>console.error(e))
    }




    return(
        <div>
            <h1>Inquiries</h1>
            <form className="form" onSubmit={(e)=>handleSubmit(e)}>
                <label>{"You're Interested in Adopting "+selectedAnimal.name}</label>
                <label>{"Pet ID: "+selectedAnimal.id}</label>
                <img width="250"  alt={selectedAnimal.name} src={selectedAnimal.primary_photo_cropped.full} />
                <label htmlFor="name">Enter Your Name</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e)=>handleNameChange(e)}
                    value={formName}
                />
               <label htmlFor="name">Enter Your Email Address</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e)=>handleEmailChange(e)}
                    value={formEmail}
                />
                 <button type="submit">Inquire About Adopting</button>
             </form>
             <div className='inquiryList'>
                {inquiryCards}
             </div>
        </div>
    )



}
export default Inquiries;