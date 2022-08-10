import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div>
            <img  
            alt="logo"
            className='logo'
            src='https://media.istockphoto.com/vectors/online-shop-logo-design-vector-id1266252971?k=20&m=1266252971&s=612x612&w=0&h=BjUZs1fZeMluFYUH51Czezs7cqQonZhggFJ3slhwBMk=' />


            {/*<li>{auth ? <Link to="/signup" onClick={logout}>Logout</Link> : <Link to="/signup">Signup</Link>}</li>
                <li><Link to="/login">Login</Link></li>*/}
            {
                auth ?
                    <ul className='nav-ul'>
                        <>

                            <li><Link to="/">Products</Link></li>
                            <li><Link to="/add">Add Products</Link></li>
                            {/*<li><Link to="/update">Update Products</Link></li>*/}
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/login" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                        </>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <>

                            <li> <Link to="/signup">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    </ul>
            }

        </div>
    )
}

export default Nav;