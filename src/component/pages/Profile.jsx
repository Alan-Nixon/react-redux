import React from 'react'
import '../css/Profile.css'

function Profile() {
    const userDetails = {
        Name: "Alan Nixon",
        Email: "alannixon2520@gmail.com",
        Job: "Web Developer",
        Phone: 6282995964,
        profileImage: "data:image/jpeg;base64,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"
    }
    return (
        <div className='parentDivProfile'>
            <div className="navbar-top">
                <div className="title">
                    <h1>Profile</h1>
                </div>

                <ul>
                    <li>
                        <a href="#sign-out">
                            <i className="fa fa-sign-out-alt fa-2x"></i>
                        </a>
                    </li>
                </ul>
            </div>


            <div className="sidenav">
                <div className="profile">
                    <img src={userDetails.profileImage} alt="" width="100" height="100" />

                    <div className="name">
                        {userDetails.Name}
                    </div>
                    <div className="job">
                        {userDetails.Job}
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
                <h2>IDENTITY</h2>

                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{userDetails.Name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{userDetails.Email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{userDetails.Phone}</td>
                                </tr>



                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-sm-11 mr-5">
                                <p className='changeNameProfile'>change profile</p>
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>


                <h2>SOCIAL MEDIA</h2>
                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <div className="social-media">
                            <span className="fa-stack fa-sm">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-facebook fa-stack-1x fa-inverse"></i>
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
