import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/home/home.js'
import Signup from './components/auth/signup/signup'
import Login from './components/auth/login/login'
import Lend from './components/lend/lend'
import Ride from './components/ride/ride'
import PrivateRoutes from './utilities/privateRoute'
import LoggedInRoute from './utilities/noSignup'
const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <LoggedInRoute path="/signup" exact component={Signup} />
                <LoggedInRoute path="/login" exact component={Login} />
                <PrivateRoutes path="/lend" exact component={Lend} />
                <Route path="/ride" exact component={Ride} />

            </Switch>
        </BrowserRouter>
    )
}

export default Router;