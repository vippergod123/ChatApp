import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar"
import Dashboard from './Components/Dashboard/Dashboard'
import ProjectDetails from "./Components/Projects/ProjectDetails"
import Signin from './Components/Auth/Signin'
import Signup from './Components/Auth/Signup'
import CreateProject from './Components/Projects/CreateProject'

class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <div className = "App">
                    <Navbar/>
                    <Switch>
                        <Route exact path = "/" component = {Dashboard}/>
                        <Route path = "/project/:id" component = {ProjectDetails}/>
                        <Route path = "/signin" component = {Signin}/>
                        <Route path = "/signup" component = {Signup}/>
                        <Route path = "/create" component = {CreateProject}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;