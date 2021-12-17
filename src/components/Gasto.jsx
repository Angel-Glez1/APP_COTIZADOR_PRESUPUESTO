import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatCantidad, formateFecha } from "../helper";
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const diccionarios = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
}



const Gasto = ({ gasto, setGastoEditar , eliminarGasto}) => {

    const { nombre, cantidad, categoria, fecha } = gasto;


    const handleEditarGasto = () => {
        setGastoEditar(gasto);
    }




    const leadingActions = () => (
        // Lado Izquierdo
        <LeadingActions>
            <SwipeAction onClick={handleEditarGasto}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        // Lado Derecha
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(gasto.id)} destructive={true} >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );


    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">

                    <div className="contenido-gasto">

                        <img src={diccionarios[categoria]} alt="icono" />

                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto"> {nombre} </p>
                            <div className="fecha-gasto">
                                Agredado el: {''}
                                <span>{formateFecha(fecha)} </span>
                            </div>
                        </div>
                    </div>

                    <p className="cantidad-gasto">{formatCantidad(cantidad)}</p>

                </div>
            </SwipeableListItem>
        </SwipeableList>

    )
}

export default Gasto
