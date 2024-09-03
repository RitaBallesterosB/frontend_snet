import { Outlet } from 'react-router-dom';
import { HeaderPriv } from './HeaderPriv';
import { Sidebar } from './Sidebar';

export const PrivateLayout = () => {
  return (
    <>
      {/* Menú de Navegación Principal */}
      <HeaderPriv />

      {/* Contenido Principal */}
      <section className='layout__content'>
        <Outlet />
      </section>

      {/* Sidebar o Barra Lateral */}
      <Sidebar />
    </>
  )
}

