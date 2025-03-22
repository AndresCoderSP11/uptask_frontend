import { Project, TeamMember } from "types";

/* Aparentemente esta respuesta verifica si el objeto Project que eta el id del manager ,
es igual al autenticado, si no es igual no meustras nada, pero si SI , muestrsa la informacion */
export const isManager=(managerId:Project['manager'],userId:TeamMember['_id'])=>{
    return managerId===userId
}