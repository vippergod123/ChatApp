const initState = {
    projects: [
        {id: '1', title: 'A', content: 'abc'},
        {id: '2', title: 'B', content: 'xyz'},
        {id: '3', title: 'C', content: 'uit'},
    ],

}

const projectReducer = (state = initState, action) => { 
    switch( action.type ) { 
        case "CREATE_PROJECT":
            return state;
        case "CREATE_PROJECT_ERROR":
            console.log('Create project error', action.err);
            return state;
        default:
            return state
    }
    
}

export default projectReducer