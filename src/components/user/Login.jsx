import { useState } from 'react';
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  // Hook para redirigir a la página de la red social
  const navigate = useNavigate();
  
  // Estado para obtener los datos desde el formulario
  const { form, changed } = useForm({});

  // Estado para validar si el usuario se identificó correctamente
  const [ logged, setLogged ] = useState("not logged");

  // Estado para setear los valores del token y usuario en el contexto de la aplicación
  const { setAuth } = useAuth();

  const loginUser = async(e) => {
    // prevenir que se actualice el navegador
    e.preventDefault();

    // Obtener los datos del formulario
    let userToLogin = form;

    // Petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Obtener la información retornada por la request
    const data = await request.json();

    if(data.status == "success"){

      // Guardar los datos del token y usuario en el localstorage del navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Seteamos la variable de estado logged si se autenticó correctamente el usarios
      setLogged("logged");

      // Seteamos los datos del usuario en el Auth
      setAuth(data.user);

      // Redirección
      setTimeout(() => {
        navigate('/rsocial');
      }, 1000);

    } else {
      // Seteamos la variable de estado logged si no se autenticó el usuario
      setLogged("error");
    }

    console.log(data);
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      {/* Formulario de Login*/}
      <div className="content__posts">
        <div className="form-style">

          {/* Mensajes para el usuario */}
          {logged == "logged" ? (
            <strong className='alert alert-success'>!Usuario autenticado correctamente¡</strong>
          ) :''}
          {logged == "error" ? (
            <strong className='alert alert-danger'>!El usuario no se ha autenticado¡</strong>
          ) : ''}

          <form className="form-login" onSubmit={loginUser}>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" required onChange={changed}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" required onChange={changed}/>
            </div>

            <input type="submit" value="Identifícate" className="btn btn-success" />

          </form>
        </div>
      </div>
    </>
  )
}