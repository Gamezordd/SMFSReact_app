import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import Axios from 'axios';

import {logout_url} from './constants'

interface IProps {
    isLoggedIn?: boolean;
    logout?: any;
    jwt_token?: string;
}

const mapStateToProps = (state: any) => ({
    jwt_token: state.user.jwt_token,
})

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logoutAction())
})

const NavComponentBasic = (props: IProps) =>{
    console.log('login:', props.isLoggedIn );
    
    const handleClick = () =>{
        console.log("toke: ", props.jwt_token);
        
        Axios.get(logout_url, {
            headers:{
                'Authorization': `bearer ${props.jwt_token}`
            }
        }).then(res => {
            console.log("response: ", res.data);
            
            if(res.data.logout){
                props.logout();
            }
        });
    }
    const buttons_loggedIn = (
        <div className="justify-content-end" style={{display: "flex", flexDirection: "row"}}>
            <Nav.Link onClick={handleClick} ><Link to='/login'> Sign Out </Link></Nav.Link>
            <Nav.Link><Link to='/admin'> Create Post </Link></Nav.Link>
        </div>
    );

    const buttons_notloggedIn = (
        <Nav.Link className="justify-content-end"><Link to='/login'> Login </Link></Nav.Link>
    )

    return(
        
        <Navbar bg="light" sticky="top" style={{height:"40px", marginBottom:"10px"}}>
            <Navbar.Brand>Internships</Navbar.Brand>
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Navbar.Collapse className="justify-content-end">
                {props.isLoggedIn ? buttons_loggedIn : buttons_notloggedIn}
            </Navbar.Collapse>
            
        </Navbar>
    );
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(NavComponentBasic);