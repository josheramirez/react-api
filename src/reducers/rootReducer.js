const initState = {
    currentUser: null
}

const rooReducer = (state = initState, action) => {
    console.log(action);
    if(action.type === 'UPDATE_CURRENT_USER'){
        return {
            ...state,
            currentUser: action.currentUser
        }
    }
    return state;
}

export default rooReducer