import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Login} from './index';
import { Home } from './Home/HomeComponent';
import { NavComponent } from './Navigation';
import { Admin } from './Admin'
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.user.isLoggedIn,
    jwt_token: state.user.jwt_token
});

interface IProps {
    isLoggedIn?: boolean;
    jwt_token?: string;
}

const MainBasic = (props: IProps) => {
    console.log("main login: ",  props.isLoggedIn);
    
    return(
        <React.Fragment>
            <Router>
            <NavComponent isLoggedIn = {props.isLoggedIn}/>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path={'/login'} component={Login}/>
                    {props.jwt_token ? 
                        <Route exact path={'/admin'} component={Admin}/>
                        : null}
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export const Main = connect(mapStateToProps, null)(MainBasic);

