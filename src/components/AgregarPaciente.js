import React, { Component } from 'react';
import axios from 'axios'; // Importación de axios

class AgregarPaciente extends Component {
  constructor(props) {
    super(props);
    // Inicializamos el estado del componente
    this.state = {
      rut: '',
      nombre: '',
      edad: '',
      sexo: '',
      enfermedad: ''
    };
  }

  // Función para manejar el envío del formulario
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizamos la solicitud post al backend api restful
      const response = await axios.post('http://localhost:3001/alerce/paciente', {
        rut: this.state.rut,
        nombre: this.state.nombre,
        edad: parseInt(this.state.edad), // Parseamos la edad a un número entero
        sexo: this.state.sexo,
        enfermedad: this.state.enfermedad
      });
      // Obtenemos los datos de la respuesta
      const { status, message } = response.data;
      // Mostramos un mensaje de éxito si la solicitud es exitosa
      if (status === 'success') {
        alert(message);
        // Limpiamos los campos del formulario después de agregar el paciente
        this.setState({
            rut: '',
            nombre: '',
            edad: '',
            sexo: '',
            enfermedad: ''
        })
      } else {
        // Mostramos un mensaje de error si la solicitud no es exitosa
        alert('Error al agregar paciente. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al agregar paciente:', error);
      alert('Error al agregar paciente. Por favor, intenta nuevamente.');
    }
  };

  // Función para manejar cambios en los campos de entrada del formulario
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h2>Agregar Paciente</h2>
        {/* Formulario para agregar un paciente */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>RUT:</label>
            {/* Campo de entrada para el RUT del paciente */}
            <input type="text" name="rut" value={this.state.rut} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Nombre:</label>
            {/* Campo de entrada para el nombre del paciente */}
            <input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Edad:</label>
            {/* Campo de entrada para la edad del paciente */}
            <input type="number" name="edad" value={this.state.edad} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Sexo:</label>
            {/* Campo de entrada para el sexo del paciente */}
            <input type="text" name="sexo" value={this.state.sexo} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Enfermedad:</label>
            {/* Campo de entrada para la enfermedad del paciente */}
            <input type="text" name="enfermedad" value={this.state.enfermedad} onChange={this.handleChange} required />
          </div>
          {/* Botón para enviar el formulario */}
          <button type="submit">Agregar Paciente</button>
        </form>
      </div>
    );
  }
}

export default AgregarPaciente;
