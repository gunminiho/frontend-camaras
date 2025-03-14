// TablaCamaras.jsx
import React, { useState, useMemo } from "react";
import Panic from "../assets/img/panic.webp";
import Mgfn from "../assets/img/mgfn.jpeg";
import Cam360 from "../assets/img/cam360.webp";
import Cam180 from "../assets/img/camera.jpg";
import LPR from "../assets/img/lpr.avif";

// Función que retorna la imagen adecuada según el valor de DISPOSITIVO.
const getDeviceImage = (deviceType) => {
  const type = deviceType ? deviceType.toLowerCase() : "";
  if (type.includes("cam 180")) return Cam180;
  if (type.includes("cam 360")) return Cam360;
  if (type.includes("lpr")) return LPR;
  if (type.includes("panic")) return Panic;
  if (type.includes("mgfn") || type.includes("megafono")) return Mgfn;
  return Cam180; // Valor por defecto.
};


const TablaCamaras = ({ camaras }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Función para cambiar el criterio de ordenamiento.
  const handleSortChange = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filtrar y ordenar la lista.
  const filteredAndSorted = useMemo(() => {
    let filtered = camaras || [];
    // Filtrar por número de cámara (POSTE)
    if (searchTerm) {
      filtered = filtered.filter((cam) =>
        cam.POSTE.toString().includes(searchTerm)
      );
    }
    // Ordenar según la columna seleccionada.
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let valA, valB;
        switch (sortColumn) {
          case "camNumber":
            // Ordenar por el número de cámara (POSTE)
            valA = parseInt(a.POSTE);
            valB = parseInt(b.POSTE);
            break;
          case "latencia":
            // Usamos Ping_Promedio para latencia
            valA = parseFloat(a.Ping_Promedio);
            valB = parseFloat(b.Ping_Promedio);
            break;
          case "status":
            valA = a.Status.toLowerCase();
            valB = b.Status.toLowerCase();
            break;
          case "packetLoss":
            // Convertir % a número, removiendo el signo de porcentaje.
            valA = parseFloat(a.Ping_PorcentajePerdida.replace("%", ""));
            valB = parseFloat(b.Ping_PorcentajePerdida.replace("%", ""));
            break;
          case "isapi":
            valA = a.ISAPI;
            valB = b.ISAPI;
            break;
          case "rtsp":
            valA = a.RTSP;
            valB = b.RTSP;
            break;
          default:
            return 0;
        }
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [camaras, searchTerm, sortColumn, sortDirection]);

  return (
    <div className="p-4 bg-gray-50 flex flex-col items-center justify-center gap-2">
      {/* Controles de búsqueda y ordenamiento */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Buscar por # de cámara..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleSortChange("camNumber")}
            className="border p-2 rounded"
          >
            Ordenar por Cam #
          </button>
          <button
            onClick={() => handleSortChange("latencia")}
            className="border p-2 rounded"
          >
            Ordenar por Latencia
          </button>
          <button
            onClick={() => handleSortChange("status")}
            className="border p-2 rounded"
          >
            Ordenar por Status
          </button>
          <button
            onClick={() => handleSortChange("packetLoss")}
            className="border p-2 rounded"
          >
            Ordenar por % P.Loss
          </button>
          <button
            onClick={() => handleSortChange("isapi")}
            className="border p-2 rounded"
          >
            Ordenar por ISAPI
          </button>
          <button
            onClick={() => handleSortChange("rtsp")}
            className="border p-2 rounded"
          >
            Ordenar por RTSP
          </button>
        </div>
      </div>
      <div className="overflow-auto w-full" role="region" tabIndex={0}>
        <table className="w-full table-fixed border-collapse border border-white text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-white p-2">Cam #</th>
              <th className="border border-white p-2">Dispositivo</th>
              <th className="border border-white p-2">Tipo</th>
              <th className="border border-white p-2">Fecha</th>
              <th className="border border-white p-2">Status</th>
              <th className="border border-white p-2">Ping</th>
              <th className="border border-white p-2">Latencia</th>
              <th className="border border-white p-2">P.Loss</th>
              <th className="border border-white p-2">% P.Loss</th>
              <th className="border border-white p-2">Lat min</th>
              <th className="border border-white p-2">Lat max</th>
              <th className="border border-white p-2">Lat media</th>
              <th className="border border-white p-2">ISAPI</th>
              <th className="border border-white p-2">RTSP</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted && filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((item, index) => (
                <tr key={item.IP || index}>
                  <td className="border border-white p-2">{item.POSTE}</td>
                  <td className="border border-white p-2">
                    <img
                      src={getDeviceImage(item.DISPOSITIVO)}
                      alt={item.DISPOSITIVO}
                      className="w-8 h-8 mx-auto"
                    />
                  </td>
                  <td className="border border-white p-2">{item.TIPO}</td>
                  <td className="border border-white p-2">{item.Fecha_Hora}</td>
                  <td className="border border-white p-2">{item.Status}</td>
                  <td className="border border-white p-2">
                    {item.Ping_Resultado === "✔" ? (
                      <span className="text-blue-500">✔</span>
                    ) : (
                      <span className="text-red-500">✖</span>
                    )}
                  </td>
                  <td className="border border-white p-2">{item.Ping_Promedio}</td>
                  <td className="border border-white p-2">{item.Ping_PaquetesPerdidos}</td>
                  <td className="border border-white p-2">{item.Ping_PorcentajePerdida}</td>
                  <td className="border border-white p-2">{item.Ping_Minimo}</td>
                  <td className="border border-white p-2">{item.Ping_Maximo}</td>
                  <td className="border border-white p-2">{item.Ping_Promedio}</td>
                  <td className="border border-white p-2">
                    {item.ISAPI === "✔" ? (
                      <span className="text-blue-500">✔</span>
                    ) : (
                      <span className="text-red-500">✖</span>
                    )}
                  </td>
                  <td className="border border-white p-2">
                    {item.RTSP === "✔" ? (
                      <span className="text-blue-500">✔</span>
                    ) : (
                      <span className="text-red-500">✖</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="border border-white p-2 text-center">
                  No hay cámaras disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCamaras;
