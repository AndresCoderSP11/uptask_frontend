/* Aqui es donde se va dar el contexto
para culminar aquello de las actividades */

import {DndContext, DragEndEvent} from '@dnd-kit/core'
import { TaskProject, TaskStatus } from 'types'
import TaskCard from './TaskCard'
import DropTask from './DropTask'
import { updateStatus } from '../../api/TaskAPI'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
type TaskListProps = {
    tasks: TaskProject[],
    canEdit:boolean
}

export default function TaskList({ tasks,canEdit }: TaskListProps) {

    type GroupedTasks = {
        [key: string]: TaskProject[]
    }

    const initialStatusGroups: GroupedTasks = {
        pending: [],
        onHold: [],
        inProgress: [],
        underReview: [],
        completed: []
    }

    const statusTranslations:{[key:string]:string}={
        pending:'Pendiente',
        onHold:'En Espera',
        inProgress:'En Progreso',
        underReview:'En Revision',
        completed:'Completado'

    }

    const statusStyles:{[key:string]:string}={
        pending:'border-t-slate-500',
        onHold:'border-t-red-500',
        inProgress:'border-t-blue-500',
        underReview:'border-t-amber-500',
        completed:'border-t-emerald-500'
    }

    const params=useParams();
    const projectId=params.projectId!;



    const queryClient=useQueryClient();
    const {mutate}=useMutation({
            mutationFn:updateStatus,
            onError:(error)=>{
                toast.error(error.message)
            },
            onSuccess:(data)=>{
                toast.success(data);
                queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            
            }
        })


    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);
/* AEn este caso que valide internameten, con ello se puede hacer lo del
odontrograma que se mantenga ese datos correpsondiente de forma correcta */
    console.log(groupedTasks);

    const handleDragEnd=(e:DragEndEvent)=>{
        const {over,active}=e;
        if(over && over.id){
            
            const taskId=active.id.toString()
            const status=over.id as TaskStatus 

            mutate({projectId,taskId,status})
            /* Realizar de forma Optimista, sin necesidad de hacer uso del Invalidate Query */

            /* Actualizacion de HTML sin necesidad de esperar la parte del Servidor
             */
            /* queryClient.setQueryData(['project',projectId],(oldData)=>{
                
                const newTasks=oldData.tasks.map(task=>{
                    if(task._id===taskId){
                        return {...task,status}
                    }
                    return task
                })
               return{
                ...oldData,
                tasks:newTasks
               }
            }) */
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                        <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3
                             border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                            {/* Este significa que cuando se suelta
                            se va tener dicho valor pasado en el caso consiguieten
                            en la parte del Over, revisar esta data */}
                            <DropTask status={status}></DropTask>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                            )}
                        </ul>
                    </div>
                ))}
                </DndContext>
            </div>
        </>
    )
}
