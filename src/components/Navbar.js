import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from './ContextReducer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Navbar() {

  let data=useCart();
  const [cartView,setCartView] =useState(false)
  const navigate= useNavigate();
  const handleLogout=()=>{
    //global.isLogin=false;
    localStorage.setItem('isLogin','false')
    navigate("/")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
            </ul>
              {
                (localStorage.getItem('isLogin')=='false')?
                  <div className="nav-item d-flex">
                    <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                    <Link className="btn bg-white text-success mx-1" to="/creatuser">Signup</Link>
                  </div>
                :
                <div className='d-flex'>
                  <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  <ShoppingCartIcon /> {" "}
                    <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>LogOut</div>
                  <Link className="btn bg-white mx-2"  aria-current="page" to="/profile"><AccountCircleIcon className='' /></Link>
                </div>
              }
          </div>
        </div>
    </nav>
  </div>
  )
}