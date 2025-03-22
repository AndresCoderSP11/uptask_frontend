import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "../../api/ProjectAPI";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
    

    const {data:user,isLoading:authLoading}=useAuth()
    

    const navigate=useNavigate();

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getFullProject(projectId), //Cuando recibe un parametero se va hacer uso de un getProjectId
        //Para que la consulta no demore el retry se aplcia aen falso , ya que useQuery va buscar como sea su ruta
        retry: false
    })
    /* Esto es que en base a la parte de la respuesta te va retornar o verdadero
    o falso */
    const canEdit=useMemo(()=>data?.manager===user?._id,[data,user])
    console.log('El valor de canEdit es: ',canEdit);
    

    if (isLoading && authLoading) return 'Cargando...';
    if (isError) return <Navigate to='/404'></Navigate>;
    if (data && user) return (<>
        <h1 className=" text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light mt-5 text-gray-600">{data.description}</p>

        {isManager(data.manager,user._id) && <>
            <nav>
            <button
                type="button"
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors"
                onClick={()=>navigate('?newTask=true')}
            >
                Agregar Tarea
            </button>

            <Link
                to={'team'}
                className=" mx-4 bg-fuchsia-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors"
            >
                Colaboradores
            </Link>
        </nav>
        </>}
        


        {/* En la parte del TaskList hay un TaskCard */}
        <TaskList tasks={data.tasks} canEdit={canEdit}>

        </TaskList>

        <AddTaskModal></AddTaskModal>
        <EditTaskData></EditTaskData>
        <TaskModalDetails projectId={projectId} ></TaskModalDetails>
    </>
    )


}