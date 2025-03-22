import { useState } from 'react';
import NewPasswordToken from '../../components/auth/NewPasswordToken';
import NewPasswordForm from '../../components/auth/NewPasswordForm';

export default function NewPasswordView() {

    const [token,setToken]=useState('');



    const [isValidToken,setIsValidToken]=useState(false);


   
    return (
        <>

            <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
            <p className="text-2xl font-light text-white mt-6 mb-4">
                Olvidaste tu password? Coloca tu email {''}
                <span className=" text-fuchsia-500 font-bold my-2"> y reestablece tu password</span>
            </p>
            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}></NewPasswordToken> : <NewPasswordForm token={token} ></NewPasswordForm>}

            
        </>
    )
}