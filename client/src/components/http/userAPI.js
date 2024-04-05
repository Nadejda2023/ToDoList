import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line no-unused-vars
import { $authHost, $host } from ".";

export const registration = async (loginOrEmail, password ) => {
    const {data} = await $authHost.post('api/auth/registration', {loginOrEmail, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
    
}

export const login = async (loginOrEmail, password ) => {
    const {data} = await $authHost.post('api/auth/login', {loginOrEmail, password })
    localStorage.setItem('token',data.token)
    console.log(data.token)
    return jwtDecode(data.token)
}
