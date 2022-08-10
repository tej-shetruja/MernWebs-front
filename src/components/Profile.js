import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const UpdateProduct = () => {
    const [name, setName] = React.useState("")
    const [mail, setMail] = React.useState("")
    
    const params =useParams();
    const navigate = useNavigate();

    useEffect(  () => {
        console.warn(params)
        getProductDetails();
    }, [] )

    const getProductDetails = async () =>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setName(result.name)
        setMail(result.mail)
        
    }

   

    return (
        <div className='product'>
            <h1> Update Product</h1>
            <input className="inputBox" type={"text"} placeholder="Enter product Name "
                value={JSON.parse(auth).name} onChange={(e) => setName(e.target.value)} />

            <input className="inputBox" type={"text"} placeholder="Enter product price  "
                value={JSON.parse(auth).mail} onChange={(e) => setMail(e.target.value)} />


        

            <button onClick={UpdateProfile} className="appbutton" type={"submit"}>Update profile</button>
        </div>
    )
}

export default UpdateProduct