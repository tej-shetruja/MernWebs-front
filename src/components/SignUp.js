import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('result');
        if (auth) {
            navigate('/')
        }
    })
    const collectData = async () => {
        console.warn("email, password", email, password)
         if (!name || !password || !email) {
            setError(true)
            return false
        }
        let result = await fetch('https://mern-webs.herokuapp.com/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        result = await result.json()
        console.warn(result)
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate("/")
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type={"Text"}
                value={name} onChange={(e) => setName(e.target.value)} placeholder="enter name" />
            {error && !name && <span className='invalid-input'>Enter valid Name</span>}

            <input className="inputBox" type={"Text"}
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" />
            {error && !email && <span className='invalid-input'>Enter valid E-mail</span>}

            <input className="inputBox" type={"password"}
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter password" />
            {error && !password && <span className='invalid-input'>Enter valid Password</span>}

            <button onClick={collectData} type="button" className="appbutton">Sign Up</button>
        </div>
    )
}

export default SignUp;
