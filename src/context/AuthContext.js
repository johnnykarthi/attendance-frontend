import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();


const AuthReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {owner:action.payload};
        case 'LOGOUT':
            return {owner:null}
        default:
            return state
    }
}



export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer,{
        owner:null
    })

    useEffect(()=>{
        const owner = localStorage.getItem('owner')
        if(owner){
            dispatch({type:'LOGIN',payload:JSON.parse(owner)})
        }
    },[])
    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}