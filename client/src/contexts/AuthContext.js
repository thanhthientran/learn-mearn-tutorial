// Quản lí toàn bộ trạng thái của App.
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { authReducer } from '../reducers/authReducer'
import { apiUrl } from './constants'
import setAuthToken from './../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    //check user logged in
    const loadUser = async () => {
        if (localStorage['prevlife']) {
            setAuthToken(localStorage['prevlife'])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth/`)
            if (response.data.success) {
                dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, user: response.data.user } })
            }
        } catch (error) {
            localStorage.removeItem('prevlife')
            setAuthToken(null)
            dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } })
        }
    }

    useEffect(() => loadUser(), [])
    // loadUser()

    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            //save token to local storage
            if (response.data.success)
                localStorage.setItem('prevlife', response.data.accessToken)

            await loadUser()
            return response.data
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    //Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            //save token to local storage
            if (response.data.success)
                localStorage.setItem('prevlife', response.data.accessToken)

            await loadUser()
            return response.data
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    //logout
    const logoutUser = () => {
        localStorage.removeItem('prevlife')
        dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } })
    }

    //context data
    const authContextData = { loginUser, registerUser, logoutUser, authState }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
