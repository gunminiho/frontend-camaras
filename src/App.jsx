import './App.css'
import Header from './Components/Header';
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/404";
import ConsultaDispositivo from "./Pages/ConsultaDispositivo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

//import data from '../data.json'

function App() {

  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Conecta al backend; ajusta la IP y el puerto según corresponda
    //socketRef.current = io("http://192.168.30.91:3000", {
    socketRef.current = io("http://192.168.30.57:3000", {
      transports: ["websocket"],
    });

    // Cuando se conecte, solicitamos el estado actual de las cámaras
    socketRef.current.on("connect", () => {
      console.log("Conectado con ID:", socketRef.current.id);
      // Emitimos el evento para obtener el estado general
      socketRef.current.emit("getCameraStatus");
    });

    socketRef.current.on("cameraStatusSingle", (response) => {
      setResult((prevResult) => [...prevResult, response]);
      //console.log("Resultado verificado on-demand:", result);
    }
    );

    // Escucha el evento "cameraStatus" para recibir la lista de cámaras
    socketRef.current.on("cameraStatus", (data) => {
      console.log("Estado de cámaras recibido:", data);
      setData(data);
    });

    // Ejemplo: si el servidor tiene un evento on-demand para verificar una cámara
    socketRef.current.on("cameraStatusSingle", (result) => {
      console.log("Resultado verificado on-demand:", result);
      // Puedes actualizar el estado si deseas, p.e. re-emitir getCameraStatus
      // socketRef.current.emit("getCameraStatus");
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Desconectado:", reason);
    });

    // Limpieza de la conexión al desmontar el componente
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Función para emitir un evento on-demand y verificar una cámara en concreto (por ejemplo, con POSTE "005")
  const handleOnDemandCheck = (poste) => {
    socketRef.current.emit("checkCameraByPoste", poste);
  };

  return (
    <>
      <BrowserRouter>
        <Header data={data} />
        <Routes>
          <Route path='/' element={<Dashboard data={data} />} />
          <Route path='/consulta' element={<ConsultaDispositivo data={data} socketEmit={socketRef} result={result} setResult={setResult} />} />
          {/* Ruta comodín para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <Estadisticas data={data} />
      <TablaCamaras camaras={data} /> */}
    </>
  )
}

export default App
