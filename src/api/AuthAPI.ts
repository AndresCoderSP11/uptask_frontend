import { isAxiosError } from "axios"
import api from "../lib/axios"
import { ConfirmToken, UserRegistrationForm,RequestConfirmationCodeForm, UserLoginForm, ForgotPasswordForm, NewPasswordForm, userSchema, checkPasswordForm } from "../types"

export async function createAccount(formData:UserRegistrationForm){
    try {
        const url='/auth/create-account';
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData:ConfirmToken){
    try {
        const url='/auth/confirm-account';
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestNewCode(formData:RequestConfirmationCodeForm){
    try {
        const url='/auth/request-code';
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticadUser(formData:UserLoginForm){
    try {
        const url='/auth/login';
        const {data}=await api.post<string>(url,formData)
        localStorage.setItem('AUTH_TOKEN',data);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData:ForgotPasswordForm){
    try {
        const url='/auth/forgot-password';
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData:ConfirmToken){
    try {
        const url='/auth/validate-token';
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type updatePasswordProp={
    token:string,
    formData:NewPasswordForm
}

export async function updatePasswordWithToken({token,formData}:updatePasswordProp){
    try {
        const url=`/auth/update-password/${token}`;
        const {data}=await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser(){
    try {
        const url='/auth/user'
        const {data}=await api(url);
        const response=userSchema.safeParse(data);
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData:checkPasswordForm){
    try {
        const url='/auth/check-password'
        const {data}=await api.post<string>(url,formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}