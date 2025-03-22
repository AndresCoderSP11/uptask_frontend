import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function EditProjectView() {
    const params=useParams()
    const projectId=params.projectId!
    
    const {data,isLoading,isError}=useQuery({
        queryKey:['editProject',projectId],
        queryFn:()=>getProjectById(projectId), //Cuando recibe un parametero se va hacer uso de un getProjectId
         //Para que la consulta no demore el retry se aplcia aen falso , ya que useQuery va buscar como sea su ruta
        retry:false
        })


    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'></Navigate>
    if(data) return <EditProjectForm data={data} projectId={projectId}></EditProjectForm>
}
