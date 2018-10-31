import React from 'react'
import { connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import LoadingSpinner from '../Plugin/LoadingSpinner'
const ProjectDetails = (props) => { 
    const project = props.project
    console.log(project);
    
    if ( project ) {
        const date = project.createAt.toDate()
        
    return (
        <div className = "container section project-details">
            <div className = "card z-depth-0">
                <div className = "card-content">
                    <span className = "card-title">{project.title}</span>
                    <p>{project.content}</p>
                </div>
                <div className = "card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    <div>{date.toString()}</div>
                </div>
            </div>
        </div>
    );}
    else { 
        return (
            <div>
                <LoadingSpinner/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { 
    console.log(ownProps);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return { 
        project: project,
    }
}

export default compose (
    connect(mapStateToProps),
    firestoreConnect([
        {collection : 'projects'}
    ])
)(ProjectDetails)