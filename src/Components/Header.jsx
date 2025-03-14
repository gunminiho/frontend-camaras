// Header.jsx
import React from "react";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Importamos la librería xlsx
import DownloadXLSX from "../assets/img/xlsx.jpg";

const Header = ({ data }) => {
  // Calcula cuántas están activas e inactivas
  const totalActive = data.filter((cam) => cam.Status === "activa").length;
  const totalInactive = data.filter((cam) => cam.Status !== "activa").length;

  // Función para descargar un XLSX con la data actual
  const handleDownloadXLSX = () => {
    // 1. Creamos la hoja (worksheet) a partir de un array de objetos (data)
    const worksheet = XLSX.utils.json_to_sheet(data);
    // 2. Creamos el libro (workbook)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Camaras");
    // 3. Generamos y descargamos el archivo
    XLSX.writeFile(workbook, "Reporte_Camaras.xlsx");
  };

  return (
    <header className="bg-white p-4 flex justify-center items-center border-b-2 border-gray-100">
      {/* Logo + Título */}
      <Link to="/">
        <figure className="flex flex-row items-center gap-3">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <figcaption className="font-bold text-[22px] text-black">
            CamMarketView
          </figcaption>
        </figure>
      </Link>

      {/* Estadísticas de cámaras */}
      <span className="flex flex-row gap-6 ml-auto">
        <span className="flex gap-2 text-blue-500">
          <p>Cámaras activas:</p>
          <p>{totalActive}</p>
        </span>
        <span className="flex gap-2 text-red-500">
          <p>Cámaras inactivas:</p>
          <p>{totalInactive}</p>
        </span>

        {/* Botón para descargar XLSX */}
        <img onClick={handleDownloadXLSX} src={DownloadXLSX} className="h-8 w-8 hover:cursor-pointer hover:bg-green-500" />
      </span>

      {/* Menú de enlaces */}
      <menu className="flex gap-2 ml-auto">
        <a href="/" className="text-black hover:text-blue-300">
          Cam Dashboard
        </a>
        <a href="/observatorio" className="text-black hover:text-blue-300">
          Observatorio
        </a>
        <a href="/consulta" className="text-black hover:text-blue-300">
          Consulta Cam
        </a>
        <a href="/bodycam" className="text-black hover:text-blue-300">
          Bodycams
        </a>
      </menu>
    </header>
  );
};

export default Header;
