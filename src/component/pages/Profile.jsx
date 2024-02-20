import React, { useEffect, useState } from 'react'
import '../css/Profile.css'
import { useSelector } from 'react-redux'
import { editUser, getUser, logout } from '../../userBackend/UserController';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const Navigate = useNavigate()
    const [userDetails, setUserData] = useState(useSelector((state) => state.formData))
    const [error, setError] = useState("")

    const [profile, setProfile] = useState(userDetails)

    const handleSubmit = () => {
        if (validation(profile)) {
            alert("success")
            editUser(profile)
        } else {
            alert("failure")
        }
    }

    function validation(profile) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const fullNameRegex = /^[a-zA-Z]+([ _-][a-zA-Z]+)*$/;
        const phoneNumberRegex = /^(\+[0-9]{1,4}\s?)?[0-9]{6,14}$/;


        if (nameRegex.test(profile?.FName)) {
            if (nameRegex.test(profile?.LName)) {
                if (fullNameRegex.test(profile?.FullName)) {
                    if (phoneNumberRegex.test(profile?.Phone) && profile?.Phone > 0) {
                        if (profile?.profileImage) {
                            return true
                        } else {
                            setError("select a valid image ")
                        }
                    } else {
                        setError("please enter a valid phone number")
                    }
                } else {
                    setError("please enter a valid  full name")
                    return false
                }
            } else {
                setError("please enter a valid last name")
                return false
            }
        } else {
            setError("please enter a valid first name")
            return false
        }

    }

    const handleChange = (e) => {
        setProfile((rest) => ({ ...rest, [e.target.name]: e.target.value }));
        setError("")
    }

    const handleImageChange = (e) => {
        setProfile((rest) => ({ ...rest, profileImage: e.target.files[0] }))
    }

    useEffect(() => {
        getUser().then((result) => {
            if (result.status === 401) {
                logout().then(() => Navigate('/login'))
            }

            setUserData(result.data.userData)
            setProfile(result.data.userData)
            console.log(result.data.userData);

        })
    }, [])


    return (
        <div className='parentDivProfile'>
            <div className="navbar-top">
                <div className="title">
                    <h1>Profile</h1>
                </div>
                <ul>
                    <li>
                        <a href="/"><span style={{fontSize:"25px", fontWeight:"bold"}}>Home</span></a>

                    </li>
                    <li>
                        <a href="/logout">
                            <i className="fa fa-sign-out fa-2x"></i>
                        </a>
                    </li>
                </ul>
            </div>


            <div className="sidenav">
                <div className="profile">
                    <img src={userDetails?.profileImage} alt="" width="100" height="100" />

                    <div className="name">
                        {userDetails?.FullName}
                    </div>
                    <div className="job">
                        {userDetails?.Job}
                    </div>
                </div>

                <div className="sidenav-url">
                    <div className="url">
                        <a href="#profile" className="active">Edit Profile</a>
                        <hr align="center" />
                    </div>
                    <div className="url">
                        <a href="#settings">Logout</a>
                        <hr align="center" />
                    </div>
                </div>
            </div>

            <div className="main">
                <h2>IDENTITY</ h2>
                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        {error && <p className="error" style={{ fontSize: "1rem" }}>{error}</p>}
                        <table>
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>:</td>
                                    <td><input type="text" defaultValue={userDetails?.FName} style={{ border: 'none', height: '1rem' }} name='FName' onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>:</td>
                                    <td><input type="text" defaultValue={userDetails?.LName} style={{ border: 'none', height: '1rem' }} name='LName' onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>Full Name</td>
                                    <td>:</td>
                                    <td><input type="text" defaultValue={userDetails?.FullName} style={{ border: 'none', height: '1rem' }} onChange={handleChange} name='FullName' /></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td><input type="text" value={userDetails?.Email} style={{ border: 'none', height: '1rem' }} name='Email' /></td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td><input type="text" defaultValue={userDetails?.Phone} onChange={handleChange} style={{ border: 'none', height: '1rem' }} name='Phone' /></td>
                                </tr>



                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-sm-11 mr-5 mt-2">
                                <input type="file" onChange={handleImageChange} className="form-control" accept='image/*' />
                            </div>
                        </div>
                        <button className='btn btn-outline-primary mt-3 mr-5' onClick={handleSubmit} style={{ float: "right" }}>Save </button>
                    </div>
                </div>


                <h2>SOCIAL MEDIA</h2>
                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <div className="social-media">
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Profile
