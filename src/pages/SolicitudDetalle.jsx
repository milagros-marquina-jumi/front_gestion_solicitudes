import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import solicitudService from "../core/services/solicitudService";

const SolicitudDetalle = () => {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        solicitudService.buscarPorId(id)
            .then(response => {
                setSolicitud(response);
            })
            .catch(error => {
                console.error("Error al obtener los detalles de la solicitud:", error);
            });
    }, [id]);

    const handleVolver = () => {
        navigate("/solicitud/listar"); 
    };

    if (!solicitud) return <div>Cargando...</div>;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Detalle de la Solicitud</h5>
                    <hr />
                    <p><strong>ID:</strong> {solicitud.id}</p>
                    <p><strong>Marca:</strong> {solicitud.marca}</p>
                    <p><strong>Tipo Solicitud:</strong> {solicitud.tipoSolicitud}</p>
                    <p><strong>Fecha Envio:</strong> {solicitud.fechaEnvio}</p>
                    <p><strong>Numero Contacto:</strong> {solicitud.numeroContacto}</p>
                    <p><strong>Nombre Contacto:</strong> {solicitud.nombreContacto}</p>

                    <h6>Contactos:</h6>
                    <ul>
                        {solicitud.contactos.map((contacto) => (
                            <li key={contacto.id}>
                                {contacto.nombre} - {contacto.numero}
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-primary" onClick={handleVolver}>
                        <i className="fas fa-arrow-left"></i> Volver Atrás
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SolicitudDetalle;
