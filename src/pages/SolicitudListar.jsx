import { useEffect, useState } from "react";
import solicitudService from "../core/services/solicitudService";
import { useNavigate } from "react-router-dom";

const SolicitudListar = () => {
    const [solicitudes, setSolicitudes] = useState([]); 
    const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]); 
    const [filtro, setFiltro] = useState("todos");
    const [fechaFiltro, setFechaFiltro] = useState("");
    const [tipoSolicitudFiltro, setTipoSolicitudFiltro] = useState("");
    const navigate = useNavigate();

    const handleNuevaSolicitud = () => {
        navigate("/solicitud/nuevo");
    };

    const handleVerInfo = (id) => {
        navigate(`/solicitud/detalle/${id}`);
    };

    const handleListarSolicitud = () => {
        solicitudService.listarTodos()
            .then((response) => {
                setSolicitudes(response);
                setSolicitudesFiltradas(response); 
            })
            .catch((error) => {
                console.error("Error al obtener solicitudes:", error);
            });
    };

    const handleExportar = () => {
        solicitudService.exportarSolicitudes()
            .then((response) => {
                const blob = new Blob([response], { type: 'text/csv' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = "solicitudes.csv";
                link.click();
            })
            .catch((error) => {
                console.error("Error al exportar solicitudes:", error);
            });
    };

    const handleFiltrar = () => {
        let filtradas = [...solicitudes]; 

        if (filtro === "fecha" && fechaFiltro) {
            filtradas = filtradas.filter(item => item.fechaEnvio === fechaFiltro);
        }

        if (filtro === "tipoSolicitud" && tipoSolicitudFiltro) {
            filtradas = filtradas.filter(item => item.tipoSolicitud.toLowerCase().includes(tipoSolicitudFiltro.toLowerCase()));
        }

        setSolicitudesFiltradas(filtradas);
    };

    useEffect(() => {
        handleListarSolicitud();
    }, []);

    return (
        <div className="container-fluid mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="mb-4">Listado de Solicitudes</h5>
                    <hr />
                    <button onClick={handleNuevaSolicitud} className="btn btn-success mt-3">
                        <i className="fas fa-plus"></i> Nueva Solicitud
                    </button>
                    <button onClick={handleExportar} className="btn btn-warning mt-3 ms-2">
                        <i className="fas fa-download"></i> Exportar
                    </button>

                    <div className="mt-3 mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <select
                                    className="form-control"
                                    value={filtro}
                                    onChange={(e) => setFiltro(e.target.value)}
                                >
                                    <option value="todos">::: Todos :::</option>
                                    <option value="fecha">Por Fecha</option>
                                    <option value="tipoSolicitud">Por Tipo de Solicitud</option>
                                </select>
                            </div>
                            {filtro === "fecha" && (
                                <div className="col-md-4">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={fechaFiltro}
                                        onChange={(e) => setFechaFiltro(e.target.value)}
                                    />
                                </div>
                            )}
                            {filtro === "tipoSolicitud" && (
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tipo de Solicitud"
                                        value={tipoSolicitudFiltro}
                                        onChange={(e) => setTipoSolicitudFiltro(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="col-md-2">
                                <button
                                    onClick={handleFiltrar}
                                    className="btn btn-primary"
                                >
                                  <i className="fas fa-filter"></i> Filtrar
                                </button>
                            </div>
                        </div>
                    </div>

                    <table className="table table-bordered table-striped mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Tipo Solicitud</th>
                                <th>Fecha Envio</th>
                                <th>Numero Contacto</th>
                                <th>Nombre Contacto</th>
                                <th>Contactos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudesFiltradas.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.marca}</td>
                                    <td>{item.tipoSolicitud}</td>
                                    <td>{item.fechaEnvio}</td>
                                    <td>{item.numeroContacto}</td>
                                    <td>{item.nombreContacto}</td>
                                    <td>
                                        <ul>
                                            {item.contactos.map((contacto) => (
                                                <li key={contacto.id}>
                                                    {contacto.nombre} - {contacto.numero}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button onClick={() => handleVerInfo(item.id)} className="btn btn-info">
                                            <i className="fas fa-eye"></i> Ver Info
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SolicitudListar;
