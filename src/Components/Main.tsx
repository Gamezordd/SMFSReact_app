import React, { useEffect } from 'react';
import {Switch, Route, Redirect, withRouter, useHistory} from 'react-router-dom';
import {Login} from './index';
import { Home } from './Home/HomeComponent';
import { NavComponent } from './Navigation';
import { Admin } from './Admin'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Axios from 'axios';
import { get_status_url } from './constants';
import { loginAction } from '../redux/ActionCreators';

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.user.isLoggedIn,
    jwt_token: state.user.jwt_token
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (token: string) => dispatch(loginAction(token))
})


interface IProps {
    login?: any;
    isLoggedIn?: boolean;
    jwt_token?: string;
}

const MainBasic = (props: IProps) => {

    /*useEffect(() => {
        if(!props.isLoggedIn){
            console.log("trying to log in");
            Axios.get(get_status_url).then(res => {
                props.login(res.data.token);
                console.log("logged in");
                
            }).catch((err) => {
                console.error(err);
            })
        }
    });*/
    
    var history = useHistory();
    console.log("path:" , history.location.pathname);
    
    return(
        <React.Fragment>
            <NavComponent isLoggedIn = {props.isLoggedIn}/>
                <Switch>
                    {props.isLoggedIn ? 
                        <React.Fragment>
                            <Route exact path="/" component={Home}/>
                            <Route path={'/admin'} component={Admin}/>
                            <Redirect to={"/"}/>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Route exact path="/" component={Home}/>
                            <Route path={'/login'} render={() => <Login isSignup={false}/>}/>
                            <Route path={'/register'} render={() => <Login isSignup={true}/>}/>
                            <Redirect to={"/"}/>
                        </React.Fragment>
                        }
                </Switch>
        </React.Fragment>
    )
}
export const Main = compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(MainBasic);
//export const Main = withRouter(connect(mapStateToProps, null)(MainBasic));

