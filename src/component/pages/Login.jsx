import React, { useState } from 'react'
import '../css/Login.css'
// import Navbar from './Navbar'
import { BackendUrl, secondArgs } from '../../userBackend/UserController'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

function Login({ isAdminLogin }) {

    const Navigate = useNavigate()

    const [loginData, setLoginData] = useState({ Email: "", Password: "" })
    const [error, setError] = useState({ Email: "", Password: "" })

    const submitLogin = async () => {
        if (validation(loginData.Email.trim(), loginData.Password.trim())) {
            alert("hi")
             await fetch('/auth')
            // const result = await fetch(BackendUrl + "login", secondArgs(loginData))
            // const { token, passwordErr, emailErr, userData } = await result.json()
            // console.log("token is : ",token,userData);
            // if (passwordErr || emailErr) {
            //     setError((rest)=>({...rest,Email:emailErr}))
            //     setError((rest)=>({...rest,Password:passwordErr}))
            // } else {
            //     if (token) {
            //         alert("success")
            //         await fetch('/isAuthenticated',)
            //         alert("call done")
            //         // Navigate('/')

            //     } else {
            //         Navigate('/login')
            //     }
            // }

        }
    }

    function validation(email, password) {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?![@#$%^&*()_+={}[\]:;<>,.?/~\\-])[ -~]{6,}$/;
        if (emailRegex.test(email)) {
            if (passwordRegex.test(password)) {
                return true
            } else {
                setError((rest) => ({ ...rest, Password: "Please enter a valid password" }))
                return false
            }
        } else {
            alert("this is working")
            setError((rest) => ({ ...rest, Email: "Invalid Email, please enter a valid email" }))
            return false
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="row" style={{backgroundColor:"rgb(5, 42, 77)"}}>
                <div className="mx-auto mt-5 form-bg">
                    <form className="form" autocomplete="off">
                        <div className="form__title">
                            <h1>{isAdminLogin ? "Admin Login" : "Login"}</h1>
                        </div>
                        <div className="form__field">
                            {error && <p className="error">{error.Email}</p>}
                            <label htmlFor="email" className="form__label">email</label>

                            <input type="text" onChange={(e) => {
                                setLoginData((rest) => ({ ...rest, Email: e.target.value }));
                                setError((rest) => ({ ...rest, Email: "" }))
                            }} defaultValue="alannixon2520@gmail.co" id="email" className="form__input" />

                        </div>
                        <div className="form__field">
                            {error && <p className="error">{error.Password}</p>}
                            <label htmlFor="password" className="form__label">password</label>
                            <input type="password" onChange={(e) => {
                                setLoginData((rest) => ({ ...rest, Password: e.target.value }))
                                setError((rest) => ({ ...rest, Password: "" }))
                            }} id="password" className="form__input" defaultValue="alan@252" />
                        </div>
                        <div className="form__links">
                            <div className="form__link"><a href="/">forgot password?</a></div>
                            <div className="form__link"><a href="/signup">signup</a></div>
                        </div>
                        <button type="button" onClick={submitLogin} className="form__btn">login</button>
                    </form>
                </div>
            </div>
            <div className="" style={{backgroundColor:"rgb(5, 42, 77)",height:'55px'}}></div>

        </>
    )
}

export default Login
