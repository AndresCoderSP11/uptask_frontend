import { useAuth } from '../../hooks/useAuth';
import { useMemo } from 'react'
import { Note } from 'types'
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../api/NoteAPI';

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const {data,isLoading} = useAuth();
    const canDelete=useMemo(()=>data?._id===note.createdBy._id,[data]);

    const params = useParams();
    const projectId = params.projectId!;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const taskId = searchParams.get('viewTask')!;
    const noteId=note._id;
    const queryClient=useQueryClient();
    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    if(isLoading) return 'Cargando....';
    return (
        <>
            <div className=' p-3 flex justify-between item-center'>
                <div>
                    <p className=' font-bold text-lg text-slate-600'>{note.content}</p>
                    <p className=' text-gray-500 text-sm'>{note.createdAt}</p>
                </div>
                {
                    canDelete && (
                        <button
                            onClick={() => mutate({ projectId, taskId, noteId })}
                        type='button' className=' bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer
                         transition-colors'>Eliminar</button>
                    )
                }
                
            </div>
        </>
    )
}
