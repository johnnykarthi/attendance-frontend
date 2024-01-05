import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";


export const Employee = createContext();


const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_ATTENDANCE':
            return [...action.payload]
        case 'UPDATE_EMPLOYEE':
            return [...action.payload]
        case 'ADD_EMPLOYEE':
            return [...action.payload]
        case 'DELETE_EMPLOYEE':
            return [...action.payload]
        case 'UPDATE_INITIALSTATE':
            return [...action.payload]
        default:
            return state
    }
}


export const EmployeeContext = ({ children }) => {
    const initialstate = null
    const [emp, dispatch] = useReducer(employeeReducer, initialstate)
    const {owner} = useContext(AuthContext)
    useEffect(() => {
        const getEmployee = async () => {
            try{
            const response = await fetch('https://attendance-server-api.onrender.com/api/employee/',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${owner.token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                dispatch({type:'UPDATE_INITIALSTATE',payload:data})
            }
            
            }
            catch(e){
                console.log(e.message)
            }
        }
        if(owner)
        {
            getEmployee()
        }
    }, [owner])
    return (
        <>
            <Employee.Provider value={{ emp, dispatch }}>
                {children}
            </Employee.Provider>

        </>
    )

}