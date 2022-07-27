import React from 'react';
import './App.css';
import { Menu } from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import {Appointments} from "./components/Appointments";
import { CreateAppointment } from './components/CreateAppointment'

export function App() {

    return (
        <div className="App" style={{paddingTop: '10vh', paddingBottom: '10vh'}}>
            <h1>Welcome to PUPPY SPA</h1>
            <Menu/>
            <Routes>
                <Route path='/' element={<Appointments/>}/>
                <Route path='/createappointment' element={<CreateAppointment/>}/>
            </Routes>

        </div>
    );
}

