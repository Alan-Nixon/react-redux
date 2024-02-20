import axios from 'axios';

export const BackendUrl = 'http://localhost:5000/'
export const AdminUrl = 'http://localhost:5000/admin/'

const IsLoggedIn = async (admin) => {
    try {
        const da = await axios.get(BackendUrl + 'isAuthenticated', { withCredentials: true })
        console.log("yes logged in : ", da.data.isLoggedIn);
        return da.data.isLoggedIn

    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
};



const getAllUsers = async () => {
    const { users } = await (await fetch(AdminUrl + 'getUsers')).json()
    return users
}

const blockUser = async (userId) => {
    await fetch(AdminUrl + 'blockuser?userId=' + userId)
}

const searchUser = async (searchWord) => {
    const { users } = await (await fetch(AdminUrl + 'searchuser?search=' + searchWord)).json()
    return users
}

const editUser = async (userData) => {
    console.log(userData);
    await axios.post(BackendUrl + 'editUser', userData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

const getUser = async () => {
    return await axios.get(BackendUrl + 'getUser', { withCredentials: true })
}

const signupUser = async (userData) => {
    const res = await axios.post(BackendUrl + 'signup', userData, { withCredentials: true })
    console.log(res, res.data);
    return res.data?.data[0]
}

const logout = async () => {
    await axios.get(BackendUrl + 'logout', { withCredentials: true })
}

const adminUserEdit = async (userData) => {
    const { data } = await axios.post(AdminUrl + 'adminUserEdit', userData, { withCredentials: true })
    console.log(data,data.isDone);
    return data.isDone
}

async function deleteUserInBackend(userId) { 
    const {data} = await axios.get(AdminUrl+'deleteUser?userId='+userId,{withCredentials:true})
    return data.status
}

export { IsLoggedIn, getAllUsers, logout, blockUser, searchUser, editUser,
     getUser, deleteUserInBackend, signupUser, adminUserEdit }