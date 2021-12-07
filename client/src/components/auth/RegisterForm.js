
// import {Navigate} from 'react-router-dom'
import React from 'react';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from "./../../contexts/AuthContext"
import AlertMessage from '../Layout/AlertMessage';


const Register = () => {

    // let navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password, confirmPassword } = registerForm
    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm,
        [event.target.name]: event.target.value
    })

    //register
    const { registerUser } = useContext(AuthContext)
    const registerEvent = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword)
            return setAlert({ type: 'danger', message: 'Password do not match' })
        else {
            setAlert(null)
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
            }
            else {
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <React.Fragment>
            <Form className="mt-4" onSubmit={registerEvent}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onChangeRegisterForm}
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangeRegisterForm}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group mt-4">
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <AlertMessage info={alert} />
                <button type="submit" className="btn btn-primary mt-4">Register</button>
            </Form>
            <p className="mt-4">Already have Account?
                <Link to="/login" className="link-form-landing"> Login </Link>
            </p>
        </React.Fragment>



    )
}

export default Register