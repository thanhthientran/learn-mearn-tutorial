import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'

const ProtectedRoute = () => {

    const {
        authState: { authLoading, isAuthenticated }
    } = useContext(AuthContext)
    if (authLoading)
        (
            <div className="spinner-container">
                <Spinner animation='border' variant='info' />
            </div>
        )
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default ProtectedRoute