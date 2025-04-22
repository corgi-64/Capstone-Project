import axios from "axios";

const URL = "http://localhost:3003"

export async function getAllUsers() {
    const response = await axios.get(`${URL}/register`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function getSingleUser(id) {
    const response = await axios.get(`${URL}/register/${id}`)

    if (response.status === 200) {
        return response.data
    } else {
        return
    }
}

export async function createUser(user) {
    const response = await axios.post(`${URL}/register`, user)
    return response
}

export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/register/${id}`, user)

    return response
}

export async function deleteUser(id) {
    const response = await axios.delete(`${URL}/register/${id}`)

    return response
}