import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../../api/TaskAPI';

import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditTaskModal from './EditTaskModal';

export default function EditTaskData() {
    
    const params=useParams();
    
    const projectId=params.projectId!

    const location=useLocation();

    const queryParams= new URLSearchParams(location.search)

    const taskId=queryParams.get('editTask')!;
    /* Rewcuerda que como estamos llevando el prop en la parte de 
    ProjectDeatilsView, va ejecutar de igual forma la api , en este caso
    se hara us ode eenabled p[ara determinar si exist o no el taskId en este caso
    verificamos ahora */
    const {data,isError}=useQuery({
        queryKey:['task',taskId],
        queryFn:()=>getTaskById({projectId,taskId}),
        enabled:!!taskId,  /* La parte del doble sigono de exclamacion significa que
        se va colocar true o false , en este caso el contenido, si existe marca como true
         */
        retry:false
    })
  
    if(isError) return <Navigate to={'/404'}></Navigate>

    if(data) return <EditTaskModal data={data} taskId={taskId}></EditTaskModal>
  
  }
 
