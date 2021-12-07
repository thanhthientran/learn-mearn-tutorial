import { useContext } from "react";
import { Navigate } from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner"
import Login from "./../components/auth/LoginForm";
import Register from "./../components/auth/RegisterForm";
import { AuthContext } from './../contexts/AuthContext';

const Auth = ({ authRoute }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    let body
    if (isAuthenticated) return <Navigate replace to='/dashboard' />
    else {
        body = (
            <>
                {
                    authRoute === 'login' && <Login />
                }
                {
                    authRoute === 'register' && <Register />
                }
            </>
        )
    }

    return (
        <>
            {/* form */}
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>Learnit</h1>
                        <h4>Hoc Reactjs</h4>
                        {/* Nội dung body */}
                        {body}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Auth