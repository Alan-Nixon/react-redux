import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import { getUser } from '../../userBackend/UserController'
// import ''

function Home() {
  const [user, setUser] = useState()

  useEffect(() => {
    getUser().then((result) => {
      setUser(result.data.userData);
    })
  }, [])


  return (

    <>
      <div className="parentDiv">

        <nav id="desktop-nav" className="navBarDiv">
          <div className="logo">{user?.FName}</div>
          <div>
            <ul className="nav-links" style={{ marginLeft: "150px" }}>
              <li><a href="/" className="alinks">Home</a></li>
              <li><a href="/profile" className="alinks">Profile</a></li>
              <li><a href="/logout"> Logout <i className="fa fa-sign-out" style={{ color: "black" }}></i></a></li>
            </ul>
          </div>
        </nav>

        <section id="profile">
          <div className="section__pic-container">
            <img
              src={user?.profileImage}
              alt="John Doe profile picture"
            />
          </div>
          <div className="section__text">
            <p className="section__text__p1">Hello, I'm</p>
            <h1 className="titleInHome">{user?.FName}</h1>
            <p className="section__text__p2">Frontend Developer</p>
            <div className="btn-container">
              <button className="btn btn-color-2">
                Download CV
              </button>
              <button className="btn btn-color-1">
                Contact Info
              </button>
            </div>
          </div>
        </section>

      </div >
    </>
  )
}

export default Home
