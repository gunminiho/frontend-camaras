import './App.css'
import Estadisticas from './Components/Estadisticas';
import Header from './Components/Header';
import TablaCamaras from './Components/TablaCamaras';
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

//import data from '../data.json'

function App() {

  const [data, setData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Conecta al backend; ajusta la IP y el puerto según corresponda
    socketRef.current = io("http://192.168.30.91:3000", {
      transports: ["websocket"],
    });

    // Cuando se conecte, solicitamos el estado actual de las cámaras
    socketRef.current.on("connect", () => {
      console.log("Conectado con ID:", socketRef.current.id);
      // Emitimos el evento para obtener el estado general
      socketRef.current.emit("getCameraStatus");
    });

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
  const handleOnDemandCheck = () => {
    socketRef.current.emit("checkCameraByPoste", "005");
  };

  return (
    <>
      {/* <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-600">¡Hola, Tailwind!</h1>
         </div>
          */}
      <Header data={data} />
      <Estadisticas data={data} />
      <TablaCamaras camaras={data} />

    </>
  )
}

export default App
