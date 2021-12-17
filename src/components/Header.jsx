import ControladorPresupuesto from './ControladorPresupuestp';
import NuevoPresupuesto from './NuevoPresupuesto';

const Header = ({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) => {


    return (
        <header>
            <h1>Planificador de gastos</h1>

            {
                isValidPresupuesto
                    ? (
                        <ControladorPresupuesto
                            presupuesto={presupuesto}
                            gastos={gastos}
                            setGastos={setGastos}
                            setPresupuesto={setPresupuesto}
                            setIsValidPresupuesto={setIsValidPresupuesto}
                        />
                    )
                    : (
                        <NuevoPresupuesto
                            setIsValidPresupuesto={setIsValidPresupuesto}
                            presupuesto={presupuesto}
                            setPresupuesto={setPresupuesto}

                        />

                    )

            }


        </header>
    )
}

export default Header
