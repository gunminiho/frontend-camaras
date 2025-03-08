import DispositivosContainer from "./DispositivosContainer";
//import data from '../../data.json';



const Estadisticas = ({ data }) => {
    //console.log(data);
    return (
        <aside className="p-2 bg-gray-50">
            <span>
                <h1 className="text-black font-bold text-xl">Dispositivos offline de la red de cámaras de CECOM</h1>
                <p className="text-sm">Aqui encontraras la cantidad de camaras, btn panico y megafonos que tienen problemas conexión a la red de cámaras de CECOM</p>
            </span>
            <div className="flex flex-row gap-6 items-center justify-center m-4">
                <DispositivosContainer title="Camaras" dispositivos={data} filterType="offline" />
                <DispositivosContainer title="Megafono" dispositivos={data} filterType="offline" />
                <DispositivosContainer title="Boton de Panico" dispositivos={data} filterType="offline" />
                {/* <DispositivosContainer title="Latencia" dispositivos={data} filterType="offline" /> */}
            </div>
        </aside>
    );
}

export default Estadisticas;