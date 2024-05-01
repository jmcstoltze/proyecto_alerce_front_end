import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div>
                <h1>Menú de navegación</h1>
                <ul>
                    <li><NavLink to="/inicio">Inicio</NavLink></li>
                    <li><NavLink to="/paciente/nuevo">Agregar Paciente</NavLink></li>
                    <li><NavLink to="/pacientes/listar">Listar Pacientes</NavLink></li>
                    <li><NavLink to="/paciente/buscar">Buscar Paciente</NavLink></li>
                    <li><NavLink to="/pacientes/busqueda">Búsqueda Personalizada</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Nav;
