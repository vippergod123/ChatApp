const initState = {}

const authReducer = (state = initState, action) => { 
    switch( action.type ) { 
        case "LOGIN_ERROR" : 
            return {
                ...state,
                authError: "Login Failed"
            }
        case "LOGIN_SUCCESS":
            console.log("Login Success")
            return { 
                ...state,
                authError: null,
                
            }

        case "LOGIN_GOOGLE_ERROR" : 
            return {
                ...state,
                authError: "Login Google Failed"
            }
        case "LOGIN_GOOGLE_SUCCESS":
            console.log("Login Google Success")
            return { 
                ...state,
                authError: null,
                
            }

        case "SIGN_OUT_SUCCESS":
            console.log("Signout success");
            return state
            

        default:
            return state      
    }
}

export default authReducer