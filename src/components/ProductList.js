
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getProduct();
    }, [])


    const getProduct = async () => {
        let result = await fetch(' https://mern-webs.herokuapp.com/products',{
            headers:{
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setProducts(result)
    }
    //console.warn({ "Products": products })

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert("record is deleted")
            getProduct();
        }
    }

    const serchHandle = async (event) => {

        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProduct()
        }

    }

    const addproduct = async () => {
        navigate('/add')
    }
    return (
        <div className="product-list">
            <h1>product list</h1>
            <input type={"text"} className="search-product-box" placeholder="search product"
                onChange={serchHandle}
            />
            <ul >
                <li className="li1">S.no</li>
                <li className="li1">Name</li>
                <li className="li1">Price</li>
                <li className="li1">Category</li>
                <li className="li1">Company</li>
                <li className="li1">Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)} >Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>

                    </ul>

                )
                :<h1>no result found</h1>
            }
            <button onClick={() => addproduct()} className="appbutton2">Add Product</button>

        </div>

    )
}

export default ProductList;