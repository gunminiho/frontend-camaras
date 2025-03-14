// ConsultaDispositivo.jsx
import React, { useState, useEffect } from "react";
import Camera from "../assets/img/camera.jpg";
import MGFN from "../assets/img/mgfn.jpeg";
import Panic from "../assets/img/panic.webp";
import DB from "../../DB_610.json";
import TablaCamaras from "../Components/TablaCamaras";

const ConsultaDispositivo = ({ socketEmit, result, setResult }) => {
  const [data, setData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMegaphone, setSelectedMegaphone] = useState("");
  const [selectedPanic, setSelectedPanic] = useState("");

  useEffect(() => {
    // Cargamos la data desde el JSON (DB_610.json ubicado en la raíz del proyecto)
    setData(DB);
  }, []);

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
    // Limpiar los otros selects si se selecciona uno
    setSelectedMegaphone("");
    setSelectedPanic("");
  };

  const handleMegaphoneChange = (e) => {
    setSelectedMegaphone(e.target.value);
    setSelectedCamera("");
    setSelectedPanic("");
  };

  const handlePanicChange = (e) => {
    setSelectedPanic(e.target.value);
    setSelectedCamera("");
    setSelectedMegaphone("");
  };

  // Función que emite el evento on-demand para verificar el dispositivo
  const handleCheckDevice = () => {
    if (selectedCamera) {
      socketEmit.current.emit("checkCameraByPoste", selectedCamera);
      //console.log("Verificando Cámara, POSTE:", selectedCamera);
    } else if (selectedMegaphone) {
      socketEmit.emit("megaphoneStatusSingle", selectedMegaphone);
      //console.log("Verificando Megáfono, POSTE:", selectedMegaphone);
    } else if (selectedPanic) {
      socketEmit.emit("panicStatusSingle", selectedPanic);
      //console.log("Verificando Botón de Pánico, POSTE:", selectedPanic);
    } else {
      alert("Seleccione un dispositivo en alguno de las opciones");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-3xl mt-5">
        Consulta de Dispositivos
      </h1>
      <p className="text-center mt-2">
        Aquí podrás consultar un dispositivo para ver su estado de conexión a la
        red de cámaras de CECOM.
      </p>
      <div className="border-2 border-black h-[fit-content] w-[fit-content] mx-auto mt-16 rounded-lg p-4">
        <div className="flex flex-row gap-6 items-center justify-center w-full">
          <figure className="flex flex-col items-center">
            <img src={Camera} alt="Cámara" className="w-20 h-20" />
            <figcaption>Cámara</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={MGFN} alt="Megáfono" className="w-20 h-20" />
            <figcaption>Megáfono</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={Panic} alt="Botón de pánico" className="w-20 h-20" />
            <figcaption>Botón de pánico</figcaption>
          </figure>
        </div>
        <div className="flex flex-row gap-2 items-center justify-between w-full px-2 mt-8">
          {/* Select para cámaras (TIPO I, II, III) */}
          <select
            className="w-1/3 border-2 border-black rounded-lg p-2"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            <option value="">Selecione</option>
            {data
              .filter(
                (item) =>
                  item.TIPO === "I" ||
                  item.TIPO === "II" ||
                  item.TIPO === "III"
              )
              .map((item, index) => (
                <option key={index} value={item.POSTE}>
                  {item.POSTE}
                </option>
              ))}
          </select>
          {/* Select para megáfonos (TIPO IV) */}
          <select
            className="w-1/3 border-2 border-black rounded-lg p-2"
            value={selectedMegaphone}
            onChange={handleMegaphoneChange}
            disabled
          >
            <option value="">Selecione</option>
            {data
              .filter((item) => item.TIPO === "IV")
              .map((item, index) => (
                <option key={index} value={item.POSTE}>
                  {item.POSTE}
                </option>
              ))}
          </select>
          {/* Select para botón de pánico (TIPO V) */}
          <select
            className="w-1/3 border-2 border-black rounded-lg p-2"
            value={selectedPanic}
            onChange={handlePanicChange}
            disabled
          >
            <option value="">Selecione</option>
            {data
              .filter((item) => item.TIPO === "V")
              .map((item, index) => (
                <option key={index} value={item.POSTE}>
                  {item.POSTE}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center mt-6 gap-6">
          <button
            onClick={() => {
              const selected = selectedCamera || selectedMegaphone || selectedPanic;
              if (!selected) {
                alert("Seleccione un dispositivo en alguno de las opciones");
                return;
              }
              handleCheckDevice();
            }}
            className="border px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Verificar Dispositivo
          </button>
          <button
            className="border px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              setSelectedCamera("");
              setSelectedMegaphone("");
              setSelectedPanic("");
              setResult([]);
            }}
          >Limpiar</button>
        </div>
      </div>
      <TablaCamaras camaras={result} />
    </div>
  );
};

export default ConsultaDispositivo;
