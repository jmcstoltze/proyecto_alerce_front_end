import React, { Component } from 'react';
import axios from 'axios';

class ActualizarRegistro extends Component {
  constructor(props) {
    super(props);
    // Inicializamos el estado del componente con los datos del paciente recibidos como prop
    this.state = {
      paciente: props.paciente,
      rut: props.paciente.rut,
      nombre: props.paciente.nombre,
      edad: props.paciente.edad,
      sexo: props.paciente.sexo,
      enfermedad: props.paciente.enfermedad,
      revisado: props.paciente.revisado,
    };
  }

  
  handleChange = event => {
    
    this.setState({ [event.target.name]: event.target.value });
  };

  // Método para manejar cambios en los campos de entrada
  handleChange = event => {
    // Si el evento proviene del checkbox, actualizamos el estado de manera diferente
    if (event.target.type === 'checkbox') {
      
      // Actualizamos el estado con los nuevos valores de los campos de entrada
        this.setState({ [event.target.name]: event.target.checked }); // Caso del Checkbox de 'revisado'
    } else {
      
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  // Método para manejar el envío del formulario de actualización
  handleSubmit = async event => {
    event.preventDefault(); // Evitamos que se produzca el comportamiento por defecto del formulario
    const { paciente, rut, nombre, edad, sexo, enfermedad, revisado } = this.state; // Obtenemos los datos del estado
    try {
        // Enviamos una solicitud POST al servidor para actualizar el registro del paciente
        await axios.put(`http://localhost:3001/alerce/paciente/${paciente._id}`, {
            rut,
            nombre,
            edad,
            sexo,    
            enfermedad,
            revisado
        });
        alert('Registro actualizado correctamente.'); // Mostramos un mensaje de éxito        
        // Llamamos a la función de callback
        this.props.onEditSuccess();        
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      alert('Error al actualizar el registro. Por favor, intenta nuevamente.'); // Mostramos un mensaje de error
    }
  };

  render() {
    // Extraemos los datos del estado
    const { rut, nombre, edad, sexo, enfermedad, revisado } = this.state;

    return (
      <div>
        <h2>Actualizar Registro</h2>
        {/* Formulario para actualizar el registro del paciente */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>RUT:</label>
            {/* Campo de entrada para el RUT del paciente (desactivado porque no puede editarse) */}
            <input type="text" name="rut" value={rut} onChange={this.handleChange} disabled />
          </div>
          <div>
            <label>Nombre:</label>
            {/* Campo de entrada para el nombre del paciente */}
            <input type="text" name="nombre" value={nombre} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Edad:</label>
            {/* Campo de entrada para la edad del paciente */}
            <input type="number" name="edad" value={edad} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Sexo:</label>
            {/* Campo de entrada para el sexo del paciente */}
            <input type="text" name="sexo" value={sexo} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Enfermedad:</label>
            {/* Campo de entrada para la enfermedad del paciente */}
            <input type="text" name="enfermedad" value={enfermedad} onChange={this.handleChange} required />
          </div>
          {/* Botón para enviar el formulario */}
          <div>
            <label>
              Revisado:
              {/* Campo de entrada tipo checkbox para el estado revisado */}
              <input type="checkbox" name="revisado" checked={revisado} onChange={this.handleChange} />
            </label>
          </div>
          <button type="submit">Actualizar Paciente</button>
        </form>
      </div>
    );
  }
}

export default ActualizarRegistro;
