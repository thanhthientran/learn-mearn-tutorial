import React from 'react';
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from "./../../contexts/AuthContext"
import AlertMessage from '../Layout/AlertMessage';


const Login = () => {

    let navigate = useNavigate()

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm
    const onChangeLoginForm = event => setLoginForm({
        ...loginForm,
        [event.target.name]: event.target.value
    })

    //login
    const { loginUser } = useContext(AuthContext)
    const loginEvent = async (e) => {
        e.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/dashboard')
            }
            else{
                setAlert({type:'danger', message: loginData.message})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <React.Fragment>
            <Form className="mt-4" onSubmit={loginEvent}>
                
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter Username"
                        name="username"
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <AlertMessage info={alert}/>
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </Form>
            <p className="mt-4">You don't have Account?
                <Link to="/register" className="link-form-landing"> Register </Link>
                now
            </p>
        </React.Fragment>
    )
}

export default Login