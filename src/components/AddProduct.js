import React from 'react'
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {
    const [name, setName] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [company, setCompany] = React.useState("")
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();

    const addProduct = async () => {

        console.warn(!name)
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        console.warn(name, price, category, company)
        const userid = JSON.parse(localStorage.getItem('user'))
        console.warn({ "UserID": userid._id })
        let result = await fetch('https://mern-webs.herokuapp.com/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json()
        console.warn(result)
        localStorage.setItem("addproduct", JSON.stringify(result));
        navigate('/')



    }

    return (
        <div className='product'>
            <h1> Add Product</h1>
            <input className="inputBox" type={"text"} placeholder="Enter product Name "
                value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid Name</span>}

            <input className="inputBox" type={"text"} placeholder="Enter product price  "
                value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input'>Enter price</span>}

            <input className="inputBox" type={"text"} placeholder="Enter product category  "
                value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='invalid-input'>Enter valid category </span>}

            <input className="inputBox" type={"text"} placeholder="Enter company Name "
                value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input'>Enter valid company Name</span>}

            <button onClick={addProduct} className="appbutton" type={"submit"}>Add Product</button>
        </div>
    )
}

export default AddProduct