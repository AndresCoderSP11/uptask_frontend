import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";

export const useAuth=()=>{
    const {data,isError,isLoading}=useQuery({
        queryKey:['user'],
        queryFn:getUser,
        retry:1, //Mientras mas numeros se va poner mas lento , esto es porq ue intentara conectarlo de todas formas
        refetchOnWindowFocus:false //Este el claro ejemplo cuando hace el refecth en el caso del sentido 
        //Cuando me voy a otra pestania y luego vuelvo se hacia peticiones, al agregar false yua no 
        //adquire este conportamineto
    })

    return {data,isError,isLoading}
}