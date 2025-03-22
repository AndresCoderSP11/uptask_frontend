import { Link, Navigate, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from "../hooks/useAuth"
import Spinner from "@/components/spinner/Spinner"

/* En la parte final recuerda de poner el ToastContainer */


export default function AppLayout() {

  const {data,isError,isLoading}=useAuth();

  if(isLoading)return <Spinner></Spinner>
  if(isError){
    return <Navigate to='/auth/login'/> 
  }

  if(data) return (
    <>
        <header className=" bg-gray-800 py-5">
            <div  className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center   border border-amber-50">
                <div className="w-64 border-amber-400 border">
                    <Link to={`/`}>
                      <Logo></Logo>
                    </Link>
                </div>
                <NavMenu
                  name={data.name}
                ></NavMenu>
            </div>
        </header>

        <section className=" max-w-screen-2xl mx-auto ">
          <Outlet></Outlet> 
        </section>
        

        <footer className=" py-5">
        <p className=" text-center text-gray-600">
            Todos los derechos Reservados {new Date().getFullYear()}
        </p>
        </footer>

        <ToastContainer
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        ></ToastContainer>
    </>
  )
}
