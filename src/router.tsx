import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import CreateProjectView from './views/projects/CreateProjectView';
import EditProjectView from './views/projects/EditProjectView';
import ProjectDetailsView from './views/projects/ProjectDetailsView';
import AuthLayout from './layouts/AuthLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import ConfirmAccountView from './views/auth/ConfirmAccountView';
import RequestNewCodeView from './views/auth/RequestNewCodeView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import NewPasswordView from './views/auth/NewPasswordView';
import ProjectTeamView from './views/projects/ProjectTeamView';
import ProfileView from './views/profile/ProfileView';
import ChangePasswordView from './views/profile/ChangePasswordView';
import ProfileLayout from './layouts/ProfileLayout';
import NotFound from './views/404/NotFound';



export default function Router(){
    return(
        
        <BrowserRouter>
            <Routes>
                    <Route element={<AppLayout></AppLayout>}> {/* Siempre tiene que haber un index por grupo */}
                        <Route path='/' element={<DashboardView></DashboardView>}></Route>
                        <Route path='/projects/create' element={<CreateProjectView></CreateProjectView>}></Route>
                        <Route path='/projects/:projectId/' element={<ProjectDetailsView></ProjectDetailsView>}></Route>
                        <Route path='/projects/:projectId/edit' element={<EditProjectView></EditProjectView>}></Route>
                        <Route path='/projects/:projectId/team' element={<ProjectTeamView></ProjectTeamView>}></Route>
                       
                        {/* Rutas para Perfil de Profile en base a actualizacion de cuentas y lo demas */}

                        <Route element={<ProfileLayout></ProfileLayout>}>
                        <Route path='/profile' element={<ProfileView></ProfileView>}></Route>
                        <Route path='/profile/password' element={<ChangePasswordView></ChangePasswordView>}></Route>
                        </Route>

                    </Route>

                    <Route element={<AuthLayout/>}>
                        <Route path='/auth/login' element={<LoginView></LoginView>}></Route>
                        <Route path='/auth/register' element={<RegisterView></RegisterView>}></Route>
                        <Route path='/auth/confirm-account' element={<ConfirmAccountView></ConfirmAccountView>}></Route>
                        <Route path='/auth/request-code' element={<RequestNewCodeView></RequestNewCodeView>}></Route>
                        <Route path='/auth/forgot-password' element={<ForgotPasswordView></ForgotPasswordView>}></Route>
                        <Route path='/auth/new-password' element={<NewPasswordView></NewPasswordView>}></Route>
                    </Route>

                    <Route element={<AuthLayout></AuthLayout>}>
                        <Route path='/404' element={<NotFound></NotFound>}></Route>
                    </Route>
            </Routes>
        </BrowserRouter>
    )
}