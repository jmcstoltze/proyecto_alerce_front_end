import React, { Component } from 'react';
import ActualizarRegistro from './ActualizarRegistro'; // Importamos el componente ActualizarRegistro
import EliminarRegistro from './EliminarRegistro'; // Importamos el componente EliminarRegistro

class PacienteRegistro extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editing: false // Estado para controlar si se está editando el paciente
        };
    }
    
    // Método para activar/desactivar la edición del paciente
    toggleEditing = () => {
        this.setState(prevState => ({ editing: !prevState.editing }));
    };

    // Manejo tras actualización de registro
    handleUpdateSuccess = () => {
        // Vuelve a la lista de pacientes
        this.setState({ editing: false });
        this.props.onUpdateSuccess(); // Llama a la función de retorno proporcionada por ListarPacientes
    };

    // Manejo para la acción de volver
    handleBack = () => {
        // Recargar la lista de pacientes
        this.setState({ editing: false });
        this.props.onUpdateSuccess();
    };

    // Manejo tras eliminación de registro
    handleDeleteSuccess = () => {
        this.setState({ editing: false });
        this.props.onUpdateSuccess(); // Llama a la función de retorno proporcionada por ListarPacientes
    };

    render() {
        // Obtenemos los datos del paciente desde las props
        const { paciente } = this.props;
        const { editing } = this.state;

        return (
        <div>
            {/* Mostramos el componente ActualizarRegistro si estamos en modo de edición */}
            {editing ? (
                <ActualizarRegistro paciente={paciente}  onEditSuccess={this.handleUpdateSuccess}/>
            ) : (
                <div>
                    <h2>Detalles del Paciente</h2>
            
                    <div>
                        <p>
                            {/* Botón para activar/desactivar la edición del paciente */}
                            <a href="#" onClick={this.toggleEditing}>Editar</a>
                            {/* Componente para eliminar el registro del paciente */}
                            <EliminarRegistro pacienteId={paciente._id} onDeleteSuccess={this.handleDeleteSuccess}/>
                            {/* Botón para volver */}
                            <a href="#" onClick={this.handleBack}>Volver</a>
                        </p>
                    </div>
                    <div>
                        <p><strong>Nombre:</strong> {paciente.nombre}</p>
                        <p><strong>RUT:</strong> {paciente.rut}</p>
                        <p><strong>Edad:</strong> {paciente.edad}</p>
                        <p><strong>Sexo:</strong> {paciente.sexo}</p>
                        <p><strong>Enfermedad:</strong> {paciente.enfermedad}</p>
                        <p><strong>Fecha de Ingreso:</strong> {new Date(paciente.fechaIngreso).toLocaleDateString()}</p>
                        <p><strong>Revisado:</strong> {paciente.revisado ? 'Sí' : 'No'}</p>
                        {paciente.fotoPersonal ? (
                        <div>
                        <p><strong>Foto del Paciente:</strong></p>
                            <img src={`http://localhost:3001/alerce/imagen/${paciente.fotoPersonal}`} alt="Foto del Paciente" style={{ width: '200px'}} />
                        </div>
                        ) : (
                            <p><strong>Foto del Paciente:</strong> No hay foto disponible</p>
                        )}
                    </div>            
                </div>
            )}                    
        </div>
        );
    }
}

export default PacienteRegistro;
