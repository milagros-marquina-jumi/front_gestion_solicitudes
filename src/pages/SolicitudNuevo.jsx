import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import solicitudService from "../core/services/solicitudService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SolicitudNuevo = () => {
    const navigate = useNavigate();

    const [solicitud, setSolicitud] = useState({
        marca: "",
        tipoSolicitud: "",
        fechaEnvio: "",
        numeroContacto: "",
        nombreContacto: "",
        contactos: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSolicitud({
            ...solicitud,
            [name]: value,
        });
    };

    const handleAddContact = () => {
        setSolicitud({
            ...solicitud,
            contactos: [...solicitud.contactos, { nombre: "", numero: "" }]
        });
    };

    const handleContactChange = (index, e) => {
        const { name, value } = e.target;
        const newContacts = [...solicitud.contactos];
        newContacts[index] = { ...newContacts[index], [name]: value };
        setSolicitud({ ...solicitud, contactos: newContacts });
    };

    const handleRemoveContact = (index) => {
        const newContacts = solicitud.contactos.filter((_, i) => i !== index);
        setSolicitud({ ...solicitud, contactos: newContacts });
    };

    const handleSave = (e) => {
        e.preventDefault();

        solicitudService.guardar(solicitud)
            .then(() => {
                navigate("/solicitud/listar");
            })
            .catch((error) => {
                console.error("Error al guardar solicitud:", error);
            });
    };

    const handleCancel = () => {
        navigate("/solicitud/listar");
    };

    const handleDateChange = (fecha) => {
        setSolicitud({
            ...solicitud,
            fechaEnvio: fecha
        });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="mb-4">Nuevo Registro de Solicitud</h5>
                    <hr />

                    <form onSubmit={handleSave}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="marca" className="form-label">Marca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="marca"
                                    name="marca"
                                    value={solicitud.marca}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="tipoSolicitud" className="form-label">Tipo Solicitud</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tipoSolicitud"
                                    name="tipoSolicitud"
                                    value={solicitud.tipoSolicitud}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="nombreContacto" className="form-label">Nombre Contacto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreContacto"
                                    name="nombreContacto"
                                    value={solicitud.nombreContacto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="numeroContacto" className="form-label">Número Contacto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numeroContacto"
                                    name="numeroContacto"
                                    value={solicitud.numeroContacto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="col-12">
                                    <label htmlFor="fechaEnvio" className="form-label">Fecha Envío</label>
                                    <br />
                                    <DatePicker
                                        selected={solicitud.fechaEnvio}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        calendarClassName="datepicker-calendar"
                                        className="form-control datepicker-full-width"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contactos | </label>
                            <button type="button" className="btn btn-primary mt-2 btn-sm" onClick={handleAddContact}>
                                <i className="fas fa-plus"></i> Añadir
                            </button>
                            <table className="table table-bordered">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>Nombre Contacto</th>
                                        <th>Número Contacto</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitud.contactos.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No hay contactos agregados.
                                            </td>
                                        </tr>
                                    ) : (
                                        solicitud.contactos.map((contacto, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nombre Contacto"
                                                        name="nombre"
                                                        value={contacto.nombre}
                                                        onChange={(e) => handleContactChange(index, e)}
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Número Contacto"
                                                        name="numero"
                                                        value={contacto.numero}
                                                        onChange={(e) => handleContactChange(index, e)}
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveContact(index)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex">
                            <button type="submit" className="btn btn-success">
                                <i className="fas fa-save"></i> Guardar
                            </button>

                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                <i className="fas fa-times"></i> Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SolicitudNuevo;
