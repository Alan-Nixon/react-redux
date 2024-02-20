import React, { useEffect, useRef, useState } from 'react'
import { adminUserEdit, blockUser, deleteUserInBackend, getAllUsers, logout, searchUser, signupUser } from '../../userBackend/UserController'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const Navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [blockState, setBlockState] = useState()
  const [search, setSearch] = useState('')
  const [userData, setUserData] = useState({ Fname: "", Lname: "", Email: "", Password: "" })
  const [error, setError] = useState({ FnameErr: '', LnameErr: "", EmailErr: "", PasswordErr: "" })
  // const [edited, setEdited] = useState({ Fname: '', Lname: "", Email: "", FullName: "" })
  const [editedError, setEditedErr] = useState('')
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
    setEditedErr("")
  }

  const handleSearch = async () => {
    if (search !== "" && !/[^a-zA-Z0-9@]/.test(search)) {
      setUsers(await searchUser(search))
    }
  }

  const handleEdited = () => {
    if (editValidation(editUserDetails)) {
      alert("success")
      if (adminUserEdit(editUserDetails)) {
        window.Swal.fire({
          title: 'Edited',
          text: 'user edited successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });

      } else {
        window.Swal.fire({
          title: 'Error !!',
          text: 'some internal error occured',
          icon: 'danger',
          confirmButtonText: 'OK',
        });

      }
    }
  }

  const submitUser = async () => {
    if (Validation(userData)) {
      const data = await signupUser(userData)
      console.log(data);
      window.Swal.fire({
        title: 'Successfully created',
        text: 'new user created succesfully!',
        icon: 'success',
        confirmButtonText: 'OK'

      }).then(() => {
        setUsers((rest) => [...rest, data])
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

  function editValidation({ FName, LName, FullName, Email }) {
    const fullNameRegex = /^[a-zA-Z]+([ _-][a-zA-Z]+)*$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (nameRegex.test(FName)) {
      if (nameRegex.test(LName)) {
        if (fullNameRegex.test(FullName)) {
          if (emailRegex.test(Email)) {
            return true
          } else {
            setEditedErr("invalid email, enter a valid email")
            return false
          }
        } else {
          setEditedErr("invalid full name, Enter a valid full name")
          return false
        }
      } else {
        setEditedErr("invalid last name, Enter a valid last name")
        return false
      }
    } else {
      setEditedErr("invalid first name, Enter a valid first name")
      return false
    }
  }

  const deleteUser = (userId) => {
    window.Swal.fire({
      title: 'delete request',
      text: 'are you sure want to delete the user',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        if (deleteUserInBackend(userId)) {
          window.Swal.fire({
            title: 'deleted',
            text: 'user deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(()=>window.location.href = '/admin');
        } else {
          window.Swal.fire({
            title: 'error',
            text: 'some error occured successfully',
            icon: 'danger',
            confirmButtonText: 'OK',
          });
        }
      }
    })

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
    <><div className="row" onClick={() => { logout(); window.location.href = '/admin/login' }} style={{ float: "right", marginRight: "4%", cursor: "pointer" }}> <span><strong style={{ float: "right", marginRight: "10%", marginTop: "5%" }}>&nbsp;&nbsp;Logout</strong></span> <i style={{ fontSize: "35px" }} className="fa fa-sign-out"></i> </div>
      <div className="row col-sm-9 mx-auto mt-5">

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

        <div className="col-sm-2 mt-3">
          <button style={{ marginTop: "10px", marginRight: "20%", width: "90%" }} onClick={() => {
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
                    <button style={{ marginLeft: "5%", width: "29%" }}
                      onClick={async () => {
                        setBlockState(user?.isBlocked ? 'btn btn-warning' : 'btn btn-primary')
                        await blockUser(user._id)
                      }}
                      className={user?.isBlocked ? 'btn btn-warning' : 'btn btn-primary'}>{user?.isBlocked ? 'UnBlock' : 'Block'}
                    </button>
                    <button className='btn btn-outline-primary' onClick={() => onClickEditUser(index)} style={{ marginLeft: "10px", width: "29%" }}>Edit</button>
                    <button className='btn btn-danger' onClick={() => deleteUser(user._id)} style={{ width: "29%", marginLeft: '10px' }} type="button">Delete</button>
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
            {editedError && <p className="error">{editedError}</p>}
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
