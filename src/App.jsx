import './App.css'
import {BrowserRouter, Route,Routes,Navigate} from 'react-router-dom'

import SolicitudListar from './pages/SolicitudListar'
import SolicitudNuevo from './pages/SolicitudNuevo'
import SolicitudDetalle from './pages/SolicitudDetalle'

function App() {

  return (
    <>
     <BrowserRouter>
        <div className='container-fluid'>
            <Routes>
              <Route exact path="/" element={<SolicitudListar />} />
              <Route path="/solicitud/nuevo" element={<SolicitudNuevo/>} />
              <Route path="/solicitud/listar" element={<SolicitudListar/>} />
              <Route path="/solicitud/detalle/:id" element={<SolicitudDetalle />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App