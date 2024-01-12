import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link ,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import { useState } from 'react';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

function Header() {
const [cartView,setcartView]=useState(false);
const navigate=useNavigate();
let data=useCart();

  const logouthandle=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <Navbar expand="lg" className="navbar-dark bg-success">
      <Container>
        <Navbar.Brand className="navbar-brand  fs-1 fst-italic fw-bold" href="/">GoFood</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2">
            <Nav.Link as={Link} href="#home" className='active fs-5'>Home</Nav.Link>
            {(localStorage.getItem("authToken"))?
            <Nav.Link as={Link} to="/myorders" href="#"  className='fs-5 active'>My Orders</Nav.Link>:""}
          </Nav>
          {!(localStorage.getItem("authToken"))?
          <div className='d-flex'>
          
            <Nav.Link as={Link} to="/login" className='btn bg-white text-success mx-1'>Login</Nav.Link>
            <Nav.Link as={Link} to="/createuser" className='btn bg-white text-success mx-1'>Signup</Nav.Link>

            </div>  :
            <div class='d-flex'>
              <Nav.Link as={Link} to="#" className='btn bg-white text-success mx-1' onClick={()=>setcartView(true)}>
                My Cart{" "}
                <Badge pill bg="danger"> {data.length} </Badge>
                </Nav.Link>
{cartView?<Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}
               <Nav.Link as={Link} to="/login" className='btn bg-white text-danger mx-1' onClick={logouthandle}>Log Out</Nav.Link>
            </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
