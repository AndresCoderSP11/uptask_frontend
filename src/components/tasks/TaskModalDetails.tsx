import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '../../api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/utils';
import { statusTranslations } from '../../locales/es';
import { TaskStatus } from 'types';
import NotesPanel from '../notes/NotesPanel';



type TaskModalDetailsProps={
    projectId:string
}

export default function TaskModalDetails({projectId}:TaskModalDetailsProps) {
  
    const queryClient=useQueryClient();

    /* Siempre y cuando la parte de show el tru se va mostrar el modal nuevo */
    const navigate=useNavigate();

    const location=useLocation();
    
    const queryParams=new URLSearchParams(location.search);
    
    const taskId=queryParams.get('viewTask')!;
   
    const show=taskId ? true: false;

    const {data,isError,error}=useQuery({
            queryKey: ['task',taskId],
            queryFn: () => getTaskById({projectId,taskId}), //Cuando recibe un parametero se va hacer uso de un getProjectId
            //Enabled solo ejecuta si dicho archivo o valor existe, si no existe ya 
            // no ejecuta dicho useQueyr
            /* Osea para no hacer un llamado en vano, solo se va aplicar el useQuery
            cuando este existe osea cuando se abre el modal, exacto */
            enabled:!!taskId,
            retry:false
        })


    const {mutate}=useMutation({
        mutationFn:updateStatus,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data);
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            queryClient.invalidateQueries({queryKey:['task', taskId]})
            
       
        }
    })

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        
        const status=e.target.value as TaskStatus;
        const data={projectId,taskId,status}
        mutate(data);
        
    }

    if(isError){
        setTimeout(()=>{
            /* Para que aparezca sola una vez a parte de la alerta */
            toast.error(error.message,{toastId:'error'});
        },100)
        
        return <Navigate to={`/projects/${projectId}`}/>
    }
     if(data) return (
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
                                        <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                        <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                        <Dialog.Title
                                            as="h3"
                                            className="font-black text-4xl text-slate-600 my-5"
                                        >{data.name}
                                        </Dialog.Title>
                                        <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                        {
                                            data.completedBy.length ? (<>
                                                <p className=' text-lg text-slate-500 mb-2'>Historial de Cambios</p>
                                        {
                                            data.completedBy.map((activityLog)=>(
                                                <p key={activityLog._id}>
                                                    <span className=' font-bold text-slate-600'>
                                                        Estado Actualizado en {statusTranslations[activityLog.status]}
                                                    </span>{' '} por:
                                                    {activityLog.user.name}
                                                </p>
                                            ))
                                        }
                                            </>) : null
                                        }

                                        
                                        <div className='my-5 space-y-3'>
                                            <label className='font-bold'>Estado Actual:</label>

                                            <select name="" id=""
                                                className=' w-full p-3 bg-white border border-gray-300'
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                  >
                                                {Object.entries(statusTranslations).map(([key,value])=>(
                                                    <option key={key} value={key}>{value}</option>
                                                ))}
                                            </select>




                                        </div>


                                        <NotesPanel
                                            notes={data.notes}
                                        ></NotesPanel>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    }
    
