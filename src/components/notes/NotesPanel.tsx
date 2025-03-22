
import AddNoteForm from './AddNoteForm'
import { Task } from '../../types'
import NoteDetail from './NoteDetail'
type NotesPanelProps = {
  notes:Task['notes']
}


export default function NotesPanel({notes}:NotesPanelProps) {
  return (
    <>
      <AddNoteForm></AddNoteForm>
      <div>
        { notes.length ? <>
          <p className=' font-bold text-2xl text-slate-600 my-5'>Notas: </p>
          {notes.map((note)=><NoteDetail key={note._id} note={note}></NoteDetail>)}
        </>: <p className=' text-gray-500 text-center pt-3'>No hay notas</p>}
      </div>
    </>
  )
}
