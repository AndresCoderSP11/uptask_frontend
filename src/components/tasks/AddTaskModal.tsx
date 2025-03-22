import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { TaskFormData } from 'types';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../api/TaskAPI';
import { toast } from 'react-toastify';



export default function AddTaskModal() {

    const navigate = useNavigate();
    
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // EN ESTE CASO OBTIENE EL NUMERO DE LA PARTE DEL GET
    /* Imprime la parte de queryParams */
    console.log(queryParams);

    const modalTask = queryParams.get('newTask')//Con esto obtengo la ruta del newTask
    console.log(modalTask, 'Modal task');

    const show = modalTask ? true : false;
    /* En la parte de show en este caso si existe procederemos a colocar en la parte de true pero si no existe es un false */

    /* Obtener el projectId */

    const params=useParams();
    const projectId=params.projectId!;

    const initialValues: TaskFormData = {
        name: "",
        description: ""
    }
    /* Register es para los errroes, handle submit para mndar el submit en el boton y se ejecute la mutacio
    la parte de reset para limpiar la parte del formulario , formState , es para detectar los errores */
    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient=useQueryClient();

    const {mutate}=useMutation({
        mutationFn:createTask,
        onError:(error)=>{
            toast.error(error.message)
        },
        
        onSuccess:(data)=>{
            toast.success(data)
            reset();
            navigate('', { replace: true })
            queryClient.invalidateQueries({queryKey:['editProject',projectId]});
        }
       
    });

    const handleCreateTask = (formData: TaskFormData) => {
        mutate({formData,projectId})
       
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate('', { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>
                                    <form
                                        className=' mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        ></TaskForm>
                                        <input type="submit"
                                            className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white
                                            uppercase font-bold cursor-pointer transition-colors text-center'
                                            value='Guardar Tarea'
                                            
                                        />
                                    </form>



                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}