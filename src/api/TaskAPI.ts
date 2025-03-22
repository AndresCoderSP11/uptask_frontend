import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TaskFormData,Project, Task, taskSchema } from "../types";

type createTaskProps={
    formData:TaskFormData,
    projectId:Project['_id']
}

export async function createTask({formData,projectId}:createTaskProps){
    try {
        const url = `/projects/${projectId}/tasks`;
        const {data}=await api.post<string>(url,formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type getByIdProps={
    taskId:Task['_id'],
    projectId:Project['_id']
}

export async function getTaskById({projectId,taskId}:getByIdProps){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data}=await api(url);
        const response=taskSchema.safeParse(data);
        
        if(response.success){
            return response.data;
        }
    
       
       
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

type updateTaskType={
    taskId:Task['_id'],
    projectId:Project['_id'],
    formData:TaskFormData
}

export async function updateTask({projectId,taskId,formData}:updateTaskType){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data}=await api.put<string>(url,formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId,taskId}:getByIdProps){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const {data}=await api.delete<string>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type updateTaskApi={
    taskId:Task['_id'],
    projectId:Project['_id'],
    status:Task['status']
}

export async function updateStatus({projectId,taskId,status}:updateTaskApi){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const {data}=await api.post<string>(url,{status});
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
