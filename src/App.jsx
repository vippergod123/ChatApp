import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar"
import ChatFrame from './Components/UIChatting/ChatFrame'
import ProjectDetails from "./Components/Projects/ProjectDetails"
import Signin from './Components/Auth/Signin'
import Signup from './Components/Auth/Signup'
import Dashboard from './Components/Dashboard/Dashboard'


class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <div className = "App">
                    <Navbar/>
                    <Switch>
                        <Route exact path = "/" component = {ChatFrame}/>
                        <Route path = "/dashboard" component = {Dashboard} />
                        <Route path = "/aproject/:id" component = {ProjectDetails}/>
                        
                        <Route path = "/chat/:id" component = {ChatFrame}/>
                        <Route path = "/signin" component = {Signin}/>
                        <Route path = "/signup" component = {Signup}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;