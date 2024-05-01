import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Inicio from './components/Home';
import AgregarPaciente from './components/AgregarPaciente';
import ListarPacientes from './components/ListarPacientes';
import BuscarPaciente from './components/BuscarPaciente';
import BusquedaPersonalizada from './components/BusquedaPersonalizada';

//import Error from './Error';
import Nav from './components/Nav';


class Router extends Component {

    render(){
        return(
            <BrowserRouter>                                
                <div>
                    <Nav></Nav>
                    <Routes>
                        {/*Ruta con componente*/}                   
                        <Route exact path="/" Component={Inicio}></Route>
                        <Route exact path="/inicio" Component={Inicio}></Route>
                        <Route exact path="/paciente/nuevo" Component={AgregarPaciente}></Route>
                    
                        {/*
                        <Route exact path="/paciente/actualizar/:id" Component={ActualizarPaciente}></Route>
                        <Route exact path="/paciente/detalle/:id" Component={DetallePaciente}></Route>*/}

                        <Route exact path="/pacientes/listar" Component={ListarPacientes}></Route>
                        <Route exact path="/paciente/buscar" Component={BuscarPaciente}></Route>                                    
                        <Route exact path="/pacientes/busqueda" Component={BusquedaPersonalizada}></Route>

                        {/*
                        <Route exact path="/redirect/:search" render={(props)=>{
                            var search=props.match.params.search;
                            return(
                                <Redirect to={'/paciente/buscar/'+search}></Redirect>
                            )
                        }}></Route>*/}

                        {/*Ruta 404
                        <Route path="*" Component={Error}></Route>*/}
                    </Routes>
                </div>                
            </BrowserRouter>
        );
    }
}

export default Router;