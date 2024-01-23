export const BackendUrl = 'http://localhost:5000/'
export const AdminUrl = 'http://localhost:5000/admin/'

const IsLoggedIn = async (admin) => {
    try {
        const url = admin ? AdminUrl + 'adminAuthenticate' : BackendUrl + 'isAuthenticated'
        const { isLoggedIn } = await (await fetch(url, {
            method: 'get'
        })).json();

        return isLoggedIn

    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
};

const secondArgs = (data) => {
    return {
        method: 'post',
        Credential: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }
}

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

}

export { IsLoggedIn, secondArgs, getAllUsers, blockUser, searchUser, editUser }