import { Link } from "react-router-dom"


export default function NotFound() {
  return (
    <>
        <h1 className=" font-black text-center text-4xl text-white">Pagina No Encontrada</h1>
        <p>
            <Link className=" text-fuchsia-500" to={'/'}></Link>  
        </p>
    </>
  )
}
