function InquiryCard({inquiry}){
    console.log(inquiry)

    return(
        <div  className="inquiryList">
            <div  className="ui card inquiryTile">
                <h2>{inquiry.petName}</h2>
                <img height="250"  alt={inquiry.name} src={inquiry.petImage} />
                <p>{inquiry.name}</p>
                <p>{inquiry.email}</p>
            </div>
        </div>
    )

}

export default InquiryCard;