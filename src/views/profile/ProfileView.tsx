import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '../../hooks/useAuth'


export default function ProfileView() {
  /*  */
  /* Recordar que el que maneja el error principal es el AppLayout debido a
  que este tiene una forma de Validar aquello */
  const { data,isLoading}=useAuth();

  if(isLoading) return 'Cargando...'

  if(data) return <ProfileForm data={data}></ProfileForm>
}
