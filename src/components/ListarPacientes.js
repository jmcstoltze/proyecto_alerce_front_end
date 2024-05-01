import React, { Component } from 'react';
import axios from 'axios';
import PacienteRegistro from './PacienteRegistro';

class ListarPacientes extends Component {
  constructor(props) {
    super(props);
    // Inicializamos el estado del componente
    this.state = {
      pacientes: [], // Almacena la lista de pacientes
      loading: true, // Indica si se está cargando la lista de pacientes
      pacienteSeleccionado: null, // Guarda el paciente seleccionado para mostrar en el componente PacienteRegistro
    };
  }

  // Método para manejar el clic en el nombre del paciente
  handleClickNombrePaciente = (paciente) => {
    this.setState({ pacienteSeleccionado: paciente });
  };

  // Método que se ejecuta al montar el componente
  async componentDidMount() {
    try {
      // Realizamos una solicitud GET al backend para obtener la lista de pacientes
      const response = await axios.get('http://localhost:3001/alerce/pacientes');
      // Actualizamos el estado con la lista de pacientes obtenida del backend
      this.setState({ pacientes: response.data.productos, loading: false });
    } catch (error) {
      console.error('Error al obtener la lista de pacientes:', error);
      // Manejamos errores en caso de que la solicitud falle
      alert('Error al obtener la lista de pacientes. Por favor, intenta nuevamente.');
      this.setState({ loading: false });
    }
  }

  // Método asíncrono para manejar la actualización exitosa del registro del paciente
  handleUpdateSuccess = async () => {
    // Vuelve a mostrar la Lista de Pacientes
    this.setState({ pacienteSeleccionado: null });
    // Recarga los datos de la lista tras la actualización
    try {
      // Realizar una nueva solicitud GET al backend para obtener la lista actualizada de pacientes
      const response = await axios.get('http://localhost:3001/alerce/pacientes');
      // Actualizar el estado con la lista de pacientes obtenida del backend
      this.setState({ pacientes: response.data.productos });
    } catch (error) {
      console.error('Error al obtener la lista de pacientes:', error);
      // Manejar errores en caso de que la solicitud falle
      alert('Error al obtener la lista de pacientes. Por favor, intenta nuevamente.');
    }
  };

  

  // Renderización  del componente
  render() {
    const { pacientes, loading, pacienteSeleccionado } = this.state;

    // Si aún está cargando la lista de pacientes, mostramos un mensaje de carga
    if (loading) {
      return <div>Cargando...</div>;
    }

    // Si se ha seleccionado un paciente, mostramos solo el componente PacienteRegistro
    if (pacienteSeleccionado) {
      return (
        <div>          
          <PacienteRegistro 
            paciente={pacienteSeleccionado}
            onUpdateSuccess={this.handleUpdateSuccess} // Pasa la función de retorno            
          />
        </div>
      );
    }

    return (
      <div>
        <h2>Listado de Pacientes</h2>
        {/* Tabla para mostrar la lista de pacientes; se ajusta a la información requerida por el cliente*/}
        <table>
          <thead>
            <tr>
              {/*<th>RUT</th>*/}
              <th>Foto</th>
              <th>Nombre y Apellido</th>
              {/*<th>Edad</th>
              <th>Sexo</th>
              <th>Enfermedad</th>*/}              
            </tr>
          </thead>
          <tbody>
            {/* Iteramos sobre la lista de pacientes para mostrar cada uno en una fila de la tabla */}
            {pacientes.map(paciente => (
              <tr key={paciente._id}>
                {/*<td>{paciente.rut}</td>*/}
                <td>
                    {paciente.fotoPersonal ? ( // Verificamos si hay una foto disponible
                        <img src={`http://localhost:3001/alerce/imagen/${paciente.fotoPersonal}`} alt="Foto del paciente" style={{ width: '200px'}} />
                    ) : (
                        <div>No hay foto disponible</div>
                    )}
                </td>                
                <td>
                  <a href="#" onClick={() => this.handleClickNombrePaciente(paciente)}>{paciente.nombre}</a>                  
                </td>
                {/*<td>{paciente.edad}</td>
                <td>{paciente.sexo}</td>
                <td>{paciente.enfermedad}</td>*/}                
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mostramos el componente PacienteRegistro si hay un paciente seleccionado */}        
      </div>
    );
  }
}

export default ListarPacientes;
