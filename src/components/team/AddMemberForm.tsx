import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "types";
import { findUserByEmail } from "../../api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn:findUserByEmail
        
        
        
    })

    const handleSearchUser = async (formData:TeamMemberForm) => {
        const data={projectId,formData}
        mutation.mutate(data);
        console.log(mutation);
        
    }

    /* En este caso la parte del resetData lo esta haciendo para 
    que la mutation osea el data la data que le cae o recae se elimine... */
    const resetData=()=>{
        reset(),
        mutation.reset()
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            <div className=" mt-10">
                {/* La respuesta al realizar la consulta digamos que es como que positiva
                al inicio... luego una vez obtenida el resultado es como que un false , si hace
                la validacion correspondiente alli dentro */}
            {mutation.isPending && <p className=" text-center">Cargando...</p>}
            {mutation.isError && <p className=" text-center text-red-500 ">{mutation.error.message}</p>}
            {/* Recordar que la funcion de mutation data es el resultado de al aplicar el mutate,
            solo que en este caso no se esta aplicando el onSucces y el onError*/}
            {mutation.data && <SearchResult user={mutation.data} reset={resetData}></SearchResult>}
            </div>

        </>
    )
}