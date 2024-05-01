import React, { Component } from 'react';
import axios from 'axios';

class BuscarPaciente extends Component {
  constructor(props) {
    super(props);
    // Inicializamos el estado del componente
    this.state = {
      idBusqueda: '', // Almacena el valor de búsqueda ingresado por el usuario
      pacienteEncontrado: null // Almacena la información del paciente encontrado
    };
  }

  // Método para manejar el cambio en el campo de búsqueda
  handleChange = event => {
    this.setState({ idBusqueda: event.target.value });
  };

  // Método para manejar la búsqueda de pacientes por ID
  handleSearch = async () => {
    const { idBusqueda } = this.state;
    try {
      // Realizamos una solicitud GET al backend para buscar el paciente por ID
      const response = await axios.get(`http://localhost:3001/alerce/paciente/${idBusqueda}`);
      // Actualizamos el estado con la información del paciente encontrado
      this.setState({ pacienteEncontrado: response.data.paciente });
    } catch (error) {
      console.error('Error al buscar el paciente:', error);
      // Manejamos errores en caso de que la búsqueda falle
      alert('Paciente no encontrado. Por favor, intenta nuevamente.');
    }
  };

  // Método para limpiar el formulario y la pantalla
  handleClear = () => {
    this.setState({
      idBusqueda: '',
      pacienteEncontrado: null
    });
  };

  // Renderización del componente
  render() {
    const { idBusqueda, pacienteEncontrado } = this.state;

    return (
      <div>
        <h2>Buscar Paciente por ID</h2>
        {/* Campo de entrada para la búsqueda por ID */}
        <input type="text" value={idBusqueda} onChange={this.handleChange} placeholder="Ingrese ID del paciente" />
        {/* Botón para iniciar la búsqueda */}
        <button onClick={this.handleSearch}>Buscar</button>
        {/* Botón para limpiar el formulario y la pantalla */}
        <button onClick={this.handleClear}>Limpiar</button>
        {/* Mostramos la información del paciente encontrado, si existe */}
        {pacienteEncontrado && (
          <div>
            <h3>Paciente Encontrado</h3>
            <p>ID: {pacienteEncontrado._id}</p>
            <p>RUT: {pacienteEncontrado.rut}</p>
            <p>Nombre: {pacienteEncontrado.nombre}</p>
            <p>Edad: {pacienteEncontrado.edad}</p>
            <p>Sexo: {pacienteEncontrado.sexo}</p>
            <p>Fecha de Ingreso: {new Date(pacienteEncontrado.fechaIngreso).toLocaleDateString()}</p>
            <p>Enfermedad: {pacienteEncontrado.enfermedad}</p>
            {/* Mostrar la imagen del paciente si está disponible */}
            {pacienteEncontrado.fotoPersonal ? (
                <div>
                    <p>Foto del Paciente:</p>
                    <img src={`http://localhost:3001/alerce/imagen/${pacienteEncontrado.fotoPersonal}`} alt="Foto del Paciente" style={{ width: '200px'}} />
                </div>
            ) : (
                <div>
                    <p>Foto del Paciente: No hay foto disponible</p>
                </div>
            )}
          </div>
        )}
        </div>
    );
  }
}

export default BuscarPaciente;
