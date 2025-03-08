// DispositivosContainer.jsx
//import { useEffect } from 'react';
import Panic from "../assets/img/panic.webp";
import Mgfn from "../assets/img/mgfn.jpeg";
import Cam360 from "../assets/img/cam360.webp";
import Cam180 from "../assets/img/camera.jpg";
import LPR from "../assets/img/lpr.avif";


const getDeviceImage = (deviceType) => {
    const type = deviceType ? deviceType.toLowerCase() : "";
    console.log("type: ", type);
    if (type.includes("ii")) return Cam180;
    if (type.includes("i")) return Cam360;
    if (type.includes("iii")) return LPR;
    if (type.includes("v")) return Panic;
    if (type.includes("iv") || type.includes("megafono")) return Mgfn;
    return Cam180; // valor por defecto
};


const DispositivosContainer = ({ title, dispositivos, filterType }) => {

    // Filtrado dinámico según filterType
    //console.log("dispositivos: ", dispositivos);
    let filteredDevices = dispositivos || [];
    if (filterType === "offline") {
        filteredDevices = filteredDevices?.filter(device => device.Status === "inactiva");
        //console.log("offline: ", filteredDevices);
    } else if (filterType === "ping") {
        filteredDevices = filteredDevices?.filter(device => parseFloat(device.Ping_Promedio) > 5.0);
        //console.log("ping: ", filteredDevices);
    }

    return (
        <div className="border-b-2 border-r-2 shadow-lg  rounded-lg p-2 w-[300px] h-[400px] overflow-auto">
            <table className="w-full table-fixed border-collapse border border-white ">
                <caption className="caption-top text-center mb-2 text-lg font-semibold">{title}</caption>
                <thead>
                    <tr>
                        <th className="border border-white bg-[#eceff1] text-black p-[5px]">#Cam</th>
                        <th className="border border-white bg-[#eceff1] text-black p-[5px]">Tipo</th>
                        <th className="border border-white bg-[#eceff1] text-black p-[5px]">Ping</th>
                        <th className="border border-white bg-[#eceff1] text-black p-[5px]">ISAPI</th>
                        <th className="border border-white bg-[#eceff1] text-black p-[5px]">RTSP</th>
                    </tr>
                </thead>
                <tbody className="">
                    {filteredDevices && filteredDevices.length > 0 ? (
                        filteredDevices.map((item, index) => (
                            <tr key={item.IP || index}>
                                <td className="border border-white bg-white text-black p-[5px] text-center">{item.POSTE}</td>
                                <td className="border border-white bg-white text-black p-[5px] text-center"><img src={getDeviceImage(item.TIPO)} alt={item.DISPOSITIVO} className="w-6 h-6 mx-auto" /></td>
                                <td className="border border-white bg-white text-black p-[5px] text-center">{item.Ping_Promedio}ms</td>
                                <td className={`border border-white bg-white text-black p-[5px] text-center ${item.ISAPI === "✔" ? "text-blue-500" : "text-red-500"}`}> {item.ISAPI}</td>
                                <td className={`border border-white bg-white text-black p-[5px] text-center ${item.RSTP === "✔" ? "text-blue-500" : "text-red-500"}`}>{item.RTSP}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="border border-white bg-white text-black p-[5px] text-center">
                                No hay dispositivos para el filtro seleccionado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DispositivosContainer;
