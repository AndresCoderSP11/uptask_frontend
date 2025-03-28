/* En el proyecto del mongoDB una opcion en la porque no traemos la informacion 
detallada es por parte inicial uno de los motivos. La cual traeriamos 100 tareas con un mismo projectId
es por ello que se toma la opcion distinta que es la parte de la vista del Proyecto para 
validar aquello */

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { TaskProject } from 'types'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../../api/TaskAPI'
import { toast } from 'react-toastify'
import {useDraggable} from '@dnd-kit/core'


type TaskCardProps = {
    task: TaskProject,
    canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {
    /* En este parte del useParams , haremos lo miso agregar en la URL para quqqe se agregue el modal
     */

    /* En este caso se va obtener por parte del evento 
    mostrado que es en el end Anerior a la parta de DropTask */
    const {attributes,listeners,setNodeRef,transform}=useDraggable({
        id:task._id
    });
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!
    const taskId = task._id

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const style=transform ? {
        transform:`translate3d(${transform.x}px,${transform.y}px,0)`,
        zIndex:1000,
        padding:"1.25rem",
        background:"white",
        border:"1px solid #e5e7eb",
        borderWidth:"2px",
        borderColor:"#e5e7eb",
        borderRadius:"0.375rem",
    } : undefined
    return (
        <>
            <li
            
            className=' p-5 bg-white border border-slate-300 gap-3 flex justify-between gap-3'>
                {/* Esta es la caja grande de Task */}
                <div
                
                {...listeners}
            {...attributes}
            /// <reference path="" />
            ref={setNodeRef}
            style={style}
                className=' min-w-0 flex flex-col gap-y-4'>
                    
                    <p
                        className=' text-xl font-bold text-slate-600 text-left cursor-pointer'
                        /* onClick={() => navigate(location.pathname + `?editTask=${task._id}`)} */
                    >
                        {task.name}
                    </p>
                    <p className=' text-slate-500'>{task.description}</p>
                </div>
                <div className="flex shrink-0  gap-x-6">
                    <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">opciones</span>
                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                        </Menu.Button>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                    <button
                                        type='button'
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                        onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                    >
                                        Ver Tarea
                                    </button>
                                </Menu.Item>
                                {
                                    canEdit && <>
                                        <Menu.Item>
                                            <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                                onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                            >
                                                Editar Tarea
                                            </button>
                                        </Menu.Item>

                                        <Menu.Item>
                                            <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                onClick={() => mutate({ projectId, taskId })}
                                            >
                                                Eliminar Tarea
                                            </button>
                                        </Menu.Item>
                                    </>
                                }
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </li>
        </>
    )
}
