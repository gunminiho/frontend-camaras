import Estadisticas from "../Components/Estadisticas";
import TablaCamaras from "../Components/TablaCamaras";

const Dashboard = ({ data }) => {
    return (
        <>
            <Estadisticas data={data} />
            <TablaCamaras camaras={data} />
        </>
    )
};

export default Dashboard;
