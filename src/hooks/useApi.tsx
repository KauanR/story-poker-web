import axios, { AxiosRequestConfig } from 'axios'
import env from '../constants/env'
import { useUser } from './useUser'

const useApi = () => {

    const { user } = useUser()

    const authConfig: AxiosRequestConfig = {
        headers: {
            'Authorization': 'Bearer ' + user?.token
        }
    } 

    const get = (url: string, useAuth?: boolean) => {
        return axios.get(
            `${env.apiUrl}${url}`, 
            useAuth ? authConfig : undefined
        )
    }

    const post = (url: string, payload: any, useAuth?: boolean) => {
        return axios.post(
            `${env.apiUrl}${url}`, 
            payload,
            useAuth ? authConfig : undefined
        )
    }

    const put = (url: string, payload: any, useAuth?: boolean) => {
        return axios.put(
            `${env.apiUrl}${url}`, 
            payload,
            useAuth ? authConfig : undefined
        )
    }

    const del = (url: string, useAuth?: boolean) => {
        return axios.delete(
            `${env.apiUrl}${url}`, 
            useAuth ? authConfig : undefined
        )
    }

    return {
        get,
        post,
        put,
        delete: del
    }
}

export default useApi