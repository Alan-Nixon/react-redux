import React, { useEffect, useRef, useState } from 'react'
import { BackendUrl, blockUser, getAllUsers, searchUser, secondArgs } from '../../userBackend/UserController'
// import { useNavigate } from 'react-router-dom'

function Admin() {
  const [users, setUsers] = useState([])
  const [blockState, setBlockState] = useState()
  const [search, setSearch] = useState('')
  const [userData, setUserData] = useState({ Fname: "", Lname: "", Email: "", Password: "" })
  const [error, setError] = useState({ FnameErr: '', LnameErr: "", EmailErr: "", PasswordErr: "" })
  const [edited, setEdited] = useState({ Fname: '', Lname: "", Email: "", FullName: "" })

  const [editUserDetails, setEditUserDetails] = useState({})

  const myRef = useRef()
  const editForm = useRef()
  // const Navigate = useNavigate()
  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res)
    })
  }, [])

  const saveText = e => {
    setUserData((rest) => ({ ...rest, [e.target.name]: e.target.value }));
    setError((rest) => ({ ...rest, [e.target.name + 'Err']: "" }));
  }

  const saveEditedText = e => {
    setEditUserDetails((rest) => ({ ...rest, [e.target.name]: e.target.value }))
  }

  const handleSearch = async () => {
    if (search !== "" && !/[^a-zA-Z0-9@]/.test(search)) {
      setUsers(await searchUser(search))
    }
  }

  const handleEdited = () => {
    console.log(editUserDetails);
  }

  const submitUser = async () => {
    if (Validation(userData)) {
      alert("success")
      const { data } = await (await fetch(BackendUrl + 'signup', secondArgs(userData))).json()
      window.Swal.fire({
        title: 'Successfully created',
        text: 'new user created succesfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        setUsers((rest) => [...rest, data[0]])
      });
    }
  }

  const onClickEditUser = (index) => {
    setEditUserDetails(users[index])
    editForm.current.style.display = ''
    editForm.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
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
    <>
      <div className="row col-sm-8 mx-auto ">

        <div className="mx-auto col-sm-4">
          <center><h2>ADMIN PANEL</h2></center>
        </div>

        <div className=" col-sm-6 input-group mt-4">
          
          <input type="text" style={{ height: "50px" }} onChange={(e) => { setSearch(e.target.value) }}
            className="form-control" placeholder="Recipient's username or email"
            aria-label="Recipient's username" aria-describedby="basic-addon2" />

          <div className="input-group-append" onClick={handleSearch}>
            <span className="input-group-text" style={{ height: "50px" }} id="basic-addon2">Search Users</span>
          </div>
           
        </div>

        <div className="col-sm-1 mt-4 mr-2">
          <button style={{ marginTop: "10px" }} onClick={() => {
            myRef.current.style.display = ''
            myRef?.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }} className='btn btn-outline-success'>create</button>
        </div>

      </div>

      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 " >
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SL No</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope='col'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user?.FName}</td>
                  <td>{user?.LName}</td>
                  <td>{user?.Email}</td>
                  <td>
                    <button style={{ marginLeft: "10%" }}
                      onClick={async () => {
                        setBlockState(user?.isBlocked ? 'btn btn-warning' : 'btn btn-primary')
                        await blockUser(user._id)
                      }}
                      className={user?.isBlocked ? 'btn btn-warning' : 'btn btn-primary'}>{user?.isBlocked ? 'UnBlock' : 'Block'}
                    </button>
                    <button className='btn btn-outline-primary' onClick={() => onClickEditUser(index)} style={{ marginLeft: "20px" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>



        </div>
      </div>

      <div className="row" ref={myRef} style={{ display: 'none' }} >
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h2 style={{ textAlign: 'center' }}>create user</h2>
          <div className="row">
            {error.FnameErr && <p className='error' style={{ marginLeft: "10%" }}>{error.FnameErr}</p>}
            <input type="text" onChange={saveText} name='Fname' className="form-control mx-auto" placeholder='Enter your first name' style={{ width: "80%" }} />
            {error.LnameErr && <p className='error' >{error.LnameErr}</p>}
            <input type="text" onChange={saveText} name='Lname' className="form-control mx-auto mt-3" placeholder='Enter your last name' style={{ width: "80%" }} />
            {error.EmailErr && <p className='error'>{error.EmailErr}</p>}
            <input type="text" onChange={saveText} name='Email' className="form-control mx-auto mt-3" placeholder='Enter your Email' style={{ width: "80%" }} />
            {error.PasswordErr && <p className='error'>{error.PasswordErr}</p>}
            <input type="password" onChange={saveText} name='Password' className="form-control mx-auto mt-3" placeholder='Enter your Password' style={{ width: "80%" }} />
          </div><br />
          <button className='btn btn-primary' style={{ float: 'right', marginRight: "10%", marginBottom: "4%" }} onClick={submitUser} >submit</button>

        </div>
      </div>

      <div className="container" ref={editForm} style={{ display: 'none' }}>
        <div className="row" >
          <div className="col-sm-8 mx-auto">
            <h2 style={{ textAlign: "center" }}>Edit User</h2>
            <input type="text" onChange={saveEditedText} className='form-control' defaultValue={editUserDetails?.FName} name='FName' placeholder='Enter your First Name' /><br />
            <input type='text' onChange={saveEditedText} className='form-control' defaultValue={editUserDetails?.LName} name='LName' placeholder='Enter your last Name' /><br />
            <input type='text' onChange={saveEditedText} className='form-control' defaultValue={editUserDetails?.FullName} name='FullName' placeholder='Enter your Full Name' /><br />
            <input type='text' onChange={saveEditedText} className='form-control' defaultValue={editUserDetails?.Email} name='Email' placeholder='Enter your last Email' /><br />
            <button onClick={handleEdited} className='btn btn-primary mb-5' style={{ float: 'right' }}>Submit</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Admin
