
import "./Style.css";
import { HashLoader } from 'react-spinners'
export default function Spinner() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <HashLoader
        color="#3e2ef9"
        loading
        size={154}
        speedMultiplier={2}
      />
    </div>

  )
}
