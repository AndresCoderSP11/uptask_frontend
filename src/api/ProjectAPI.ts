import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, editProjectSchema, ProjectFormData, projectSchema } from "../types/index.ts";
import { Project } from "../types/index.ts";
/* Formulario para proceder la creacion de createProject */
export async function createProject(formData: ProjectFormData){
    try {
        /* En esta parte de data, es para crear , aun no se ha configurado la parte de axios*/
        /* En este {data} se extrae para obtener la respuesta */
        const {data}=await api.post('/projects',formData);
        return data

    } catch (error) {
        //Estso se realiza debido a que un simpleconsole .log no puede determinar el onError mencionando anteriormente
        //As i que lo primoridial ahora es que funcione lel onsuccess and a on RAID
        if(isAxiosError(error) && error.response){
            
            throw new Error(error.response.data.error)
        }
    }
}
/* Formulario para obtener todo los projects ,segun el usuario */
export async function getProjects(){
    
    try {
        const {data}=await api('/projects');
        const response=dashboardProjectSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


/* En la parte de proyecto esta para obtener todas las tareas correspondientes */

export async function getProjectById(id:Project['_id']){
    try {
        const {data}=await api(`/projects/${id}`);
        const response=editProjectSchema.safeParse(data);
        if(response.success){
            return response.data
        }
       
        
        /* const response=dashboardProjectSchema.safeParse(data);
        if(response.success){
            return response.data
        } */
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }

    
}

export async function getFullProject(id:Project['_id']){
    try {
        const {data}=await api(`/projects/${id}`);
        const response=projectSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }

    
}


type ProjectAPIType={
    formData: ProjectFormData,
    projectId:Project['_id']
}

export async function updateProject({formData,projectId}:ProjectAPIType){
    try {
        const {data}=await api.put<string>(`/projects/${projectId}`,formData);
        return data
        
        /* const response=dashboardProjectSchema.safeParse(data);
        if(response.success){
            return response.data
        } */
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id:Project['_id']){
    try {
        const url=`/projects/${id}`
        const {data}=await api.delete<string>(url); //En este caso la parte de delete verifica
        //que el envio de respuesta es un string.
        return data
        
        /* const response=dashboardProjectSchema.safeParse(data);
        if(response.success){
            return response.data
        } */
    } catch (error) {
        if(isAxiosError(error) && error.response){ //Validaar que existe error.response
            throw new Error(error.response.data.error)
        }
    }
}
