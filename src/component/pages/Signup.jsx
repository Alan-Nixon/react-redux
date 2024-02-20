import React, { useState } from 'react'
import '../css/Signup.css'
import { signupUser } from '../../userBackend/UserController'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({ Fname: '', Lname: "", Email: "", Password: "" })
  const [error, setError] = useState({ FnameErr: '', LnameErr: "", EmailErr: "", PasswordErr: "" })

  const saveText = e => {
    setFormData((rest) => ({ ...rest, [e.target.name]: e.target.value }));
    setError((rest) => ({ ...rest, [e.target.name + 'Err']: "" }));
  }


  const submitSignup = async () => {
    if (Validation(formData)) {
      await signupUser(formData)
      Navigate('/login')
    }
  }

  function Validation({ Fname, Lname, Email, Password }) {
    // const {status} = await fetch(BackendUrl+'signup',secondArgs())

    const passwordRegex = /^(?![!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (nameRegex.test(Fname)) {
      if (nameRegex.test(Lname)) {
        if (emailRegex.test(Email)) {
          if (passwordRegex.test(Password)) {
            return true
          } else {
            setError((rest) => ({ ...rest, PasswordErr: "Enter a valid Password" }))
          }
        } else {
          setError((rest) => ({ ...rest, EmailErr: "Enter a valid Email" }))
        }
      } else {
        setError((rest) => ({ ...rest, LnameErr: "Enter a valid last name" }))

      }
    } else {
      alert("else worked")
      setError((rest) => ({ ...rest, FnameErr: "Enter a valid first Name" }))
    }
    return false
  }

  return (
    <div className="bgSignupDiv" style={{overflowY:'hidden'}}>

      <div className="form-wrapper">
        <h1 className="titl" style={{textAlign:'center',color:'white'}}>Sign up</h1>
        <form className="form" action="">
          <div className="form-row">
            <div className="form-group ml-4">
              <label>
                {error.FnameErr && <p className='error'>{error.FnameErr}</p>}
                <input onChange={saveText} type="text" name='Fname' placeholder="First Name" className="form-input" required />
              </label>

              <div className="form-group mt-3">
                <label>
                  {error.LnameErr && <p className='error'>{error.LnameErr}</p>}

                  <input onChange={saveText} name='Lname' id="last-name" type="text" placeholder="Last Name" className="form-input" required />
                </label>
              </div>

              <div className="form-group">
                <label>
                  {error.EmailErr && <p className='error'>{error.EmailErr}</p>}
                  <span className="sr-only">Email address</span>
                  <input onChange={saveText} name='Email' type="email" placeholder="Email" className="form-input" required />
                </label>
              </div>

              <div className="form-group">
                <label>
                  {error.PasswordErr && <p className='error'>{error.PasswordErr}</p>}
                  <span className="sr-only">Password</span>
                  <input onChange={saveText} name='Password' type="password" placeholder="Password" className="form-input" required />
                </label>
              </div>
            </div>

            <div className="form-group">
              <input onClick={submitSignup} type="button" value="Submit" className="form-submit" />
            </div>
          </div>


          <footer className="form-footer">

            <div>
              Already have an account &nbsp;?
              <a href="/login" className="form-link"> <span style={{color:'white'}}>Log in</span></a>
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default Signup
