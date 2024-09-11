import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";

// Crear un contexto de autenticación
const AuthContext = createContext();

// Definir el componente proveedor de contexto AuthProvider
export const AuthProvider = ({ children }) => {

  // Estado local para guardar la información del usuario y verificar si está autenticado
  const [auth, setAuth] = useState({});

  // La primera vez que ejecutemos el AuthProvider comprobamos el token
  useEffect(() => {
    authUser();
  },[]);

  const authUser = async() => {
    // Obtener los datos del usuario autenticado del localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Comprobar si existe el token o el usuario
    if(!token || !user){
      return false;
    }

    // Transformar los datos 
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    // Petición al Backend
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    // Setear la variable de estado auth
    setAuth(data.user);
  }

   // Renderizar el proveedor de contexto con el contexto AuthContext.Provider
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      { children }
    </AuthContext.Provider>
  )
};

// Definir propTypes para el componente AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // children debe ser un nodo React y es requerido
};

export default AuthContext;