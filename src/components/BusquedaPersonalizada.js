import React, { Component } from 'react';
import axios from 'axios';

class BusquedaPersonalizada extends Component {
  constructor(props) {
    super(props);
    // Inicializamos el estado del componente
    this.state = {
      filtro: '', // Almacena el valor del filtro ingresado por el usuario
      resultados: [] // Almacena los resultados de la búsqueda
    };
  }

  // Método para manejar el cambio en el campo de filtro
  handleChange = event => {
    this.setState({ filtro: event.target.value });
  };

  // Método para manejar la búsqueda personalizada
  handleSearch = async () => {
    const { filtro } = this.state;
    try {
        let response;
        // Realizamos la solicitud GET al backend según el tipo de filtro seleccionado

        // Verifica si el filtro es una fecha en el formato indicado YYYY-MM-DD
        if (filtro.match(/^\d{4}-\d{2}-\d{2}$/)) {
            response = await axios.get(`http://localhost:3001/alerce/pacientes/search-date/${filtro}`);
        } else {
            response = await axios.get(`http://localhost:3001/alerce/pacientes/search/${filtro}`);
        }
        // Actualizamos el estado con los resultados de la búsqueda
        this.setState({ resultados: response.data.pacientes });
    } catch (error) {
        console.error('Error en la búsqueda personalizada:', error);
        // Manejamos errores en caso de que la búsqueda falle
        alert('No se encontraron coincidencias. Por favor, intenta nuevamente.');
    }
  };

  // Método para limpiar el formulario y la pantalla
  handleClear = () => {
    this.setState({
      filtro: '',
      resultados: []
    });
  };

  // Renderización del componente
  render() {
    const { filtro, resultados } = this.state;

    return (
      <div>
        <h2>Búsqueda Personalizada</h2>
        {/* Campo de entrada para el filtro */}
        <p>fecha: yyyy-mm-dd; sexo: masculino-femenino; enfermedad: demencia, alzheimer, etc.</p>
        <input type="text" value={filtro} onChange={this.handleChange} placeholder="Ingrese filtro de búsqueda" />
        {/* Botón para iniciar la búsqueda */}
        <button onClick={this.handleSearch}>Buscar</button>
        {/* Botón para limpiar el formulario y la pantalla */}
        <button onClick={this.handleClear}>Limpiar</button>
        {/* Mostramos los resultados de la búsqueda */}
        <div>
          {resultados.length > 0 && (
            <div>
              <h3>Resultados de la Búsqueda</h3>
              {resultados.map(paciente => (            
                <div key={paciente._id}>
                  <p>---------------------------------------------------------------------</p>  
                  <p>ID: {paciente._id}</p>
                  <p>RUT: {paciente.rut}</p>
                  <p>Nombre: {paciente.nombre}</p>
                  <p>Edad: {paciente.edad}</p>
                  <p>Sexo: {paciente.sexo}</p>
                  {/*<p>Fecha de Ingreso: {paciente.fechaIngreso}</p> se debe considerar hora local y hora del servidor en proyectos reales*/}
                  <p>Fecha de Ingreso: {new Date(paciente.fechaIngreso).toLocaleDateString()}</p>
                  <p>Enfermedad: {paciente.enfermedad}</p>
                  {/* Mostrar la imagen del paciente si está disponible */}
                  {paciente.fotoPersonal ? (
                    <div>
                      <p>Foto del Paciente:</p>
                      <img src={`http://localhost:3001/alerce/imagen/${paciente.fotoPersonal}`} alt="Foto del Paciente" style={{ width: '200px'}} />
                    </div>
                  ) : (
                    <div>
                      <p>Foto del Paciente: No hay foto disponible</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BusquedaPersonalizada;
