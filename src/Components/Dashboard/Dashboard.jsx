import React, { Component } from 'react';
import Notifications from './Notifications'
import ProjectList from '../Projects/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import LoadingSpinner from '../Plugin/LoadingSpinner'

class Dashboard extends Component {
    render() {
        if( this.props.projects) {
            const {projects} = this.props.projects;
        return (
            <div className="dashboard container">
                <div className = "row">
                    <div className = "col s12 m6">
                        <ProjectList projects = {projects}/>
                    </div>
                    <div className = "col s12 m5 offset-m1">
                        <Notifications/>
                    </div>
                </div>
            </div>
        ) }
        else {
            return ( 
                <div>
                    <LoadingSpinner/>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => { 
    
    return {
        projects: state.firestore.ordered,
    }
}

const mapDispatchToProps = (dispatch) =>{ 

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'projects'
        }
    ])
)(Dashboard);