let initialState = {
    user : 'Guest'
}

const userReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'login':
            return {...state , user : {...action.payload}};
          
        case 'update':
            return {...state, user : {...action.payload }};
           
        case 'logout':
            return {...state, user : action.payload};
    
        default:
            return state;
            
    }

    
}

export default userReducer;