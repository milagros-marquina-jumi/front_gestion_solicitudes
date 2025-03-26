import Axios from "../config/Axios"; 

class SolicitudService {
    url = 'solicitud';  

    async listarTodos() {
        try {
            const response = await Axios.get(`${this.url}/listar`);  
            return response.data; 
        } catch (error) {
            throw new Error("Error al obtener las solicitudes: " + error.message); 
        }
    }

    async buscarPorId(id) {
        try {
            const response = await Axios.get(`${this.url}/buscar/${id}`); 
            return response.data; 
        } catch (error) {
            throw new Error("Error al buscar solicitud con ID " + id + ": " + error.message); 
        }
    }

    async guardar(solicitud) {
        try {
            const response = await Axios.post(`${this.url}/guardar`, solicitud);  
            return response.data; 
        } catch (error) {
            throw new Error("Error al guardar la solicitud: " + error.message); 
        }
    }

    async exportarSolicitudes() {
        try {
            const response = await Axios.get(`${this.url}/exportar`, {
                responseType: 'arraybuffer', 
            });
            return response.data; 
        } catch (error) {
            throw new Error("Error al exportar las solicitudes: " + error.message); 
        }
    }
}

export default new SolicitudService();
