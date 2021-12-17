import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatCantidad } from '../helper';

const ControladorPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto,setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {


        const totalGastado = gastos.reduce((total, { cantidad }) => cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gasto para la grafica
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => setPorcentaje(nuevoPorcentaje), 1000);

        setGastado(totalGastado);
        setDisponible(totalDisponible);

    }, [gastos])


    const handleResetApp = () => {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>

                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                            trailColor: '#F5F5F5',
                            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',

                        })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    />
                </p>
            </div>
            <div className="contenido-presupuesto">
                <button className='reset-app' onClick={handleResetApp}>
                    Resetar App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatCantidad(presupuesto)}
                </p>
                <p className={(disponible < 0) ? 'negativo' : ''} >
                    <span>Disponible: </span> {formatCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatCantidad(gastado)}
                </p>

            </div>
        </div>
    )
}

export default ControladorPresupuesto
