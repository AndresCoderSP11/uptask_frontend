import ProjectForm from "@/components/projects/ProjectForm"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { ProjectFormData } from "types"
import { createProject } from "../../api/ProjectAPI"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"


export default function CreateProjectView() {

    const navigate = useNavigate();

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            console.log('desde onError');
            toast.error(error.message);
        },
        onSuccess: (respuesta) => {
            toast.success(respuesta);
            navigate('/')
        }
    })

    const handleForm = (data: ProjectFormData) => {
        /* const respuesta=await createProject(data); */
        mutate(data);

    }


    return (
        <>
            <div className=" max-w-3xl mx-auto">
                <h1 className=" text-5xl font-black">Mis Proyectos</h1>
                <p className=" text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

                <nav className=" my-5">
                    <Link
                        to='/'
                        className=" bg-purple-400 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors mt-5"
                    >
                        Volver a Proyectos
                    </Link>
                </nav>

                <form
                    className=" mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    ></ProjectForm>

                    <input type="submit" value='Crear Proyecto' className=" bg-fuchsia-600
                 hover:bg-fuchsia-700 w-full p-3 text-white uppercase cursor-pointer transition-colors
                 " />

                </form>
            </div>


        </>
    )
}
