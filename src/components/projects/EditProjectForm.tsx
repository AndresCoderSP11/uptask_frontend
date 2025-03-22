
import ProjectForm from './ProjectForm'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Project, ProjectFormData } from 'types'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { updateProject } from '../../api/ProjectAPI'
import { toast } from 'react-toastify'



type EditProjectFormType={
    data:ProjectFormData
    projectId:Project['_id']
}

export default function EditProjectForm({data,projectId}:EditProjectFormType) {

    const navigate=useNavigate();

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


    const queryClient=useQueryClient(); //En este caso es un refetchin osea eliminar data anterior actualizar cache
    //Como en Next la parte de queryClient
    const {mutate}=useMutation({
        mutationFn:updateProject,
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject',projectId]})
            

            toast.success(data)
            navigate('/')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    const handleForm=(formData:ProjectFormData)=>{
        const data={
            formData,
            projectId
        }
        mutate(data);
    }


    return (
        <div className=" max-w-3xl mx-auto">
            <h1 className=" text-5xl font-black">Editar Proyectos</h1>
            <p className=" text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar tus proyectos</p>

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
    )
}
