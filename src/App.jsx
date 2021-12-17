import { useEffect, useState } from 'react';
import Filtros from './components/Filtros';
import Header from './components/Header';
import ListadosGastos from './components/ListadosGastos';
import { Modal } from './components/modal/Modal';
import { generarID } from './helper';

import IconoNuevoGato from './img/nuevo-gasto.svg';


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  //? Este hook sirve para guardar el presupuesto 
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //? Este hook sirve para mostar o ocultar el modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  //? Este hook sirve para setear un el objeto que se quiere actulizar.
  const [gastoEditar, setGastoEditar] = useState({});


  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //? Este hook sirve para abrir el modal cuando se quiere editar un gasto
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto();
    }
  }, [gastoEditar]);

  // ? Este hook sirve para setear el presupuesto en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto)
  }, [presupuesto]);

  // Este hook sirve para que no se muestre el componente de nuevoP
  useEffect(() => {

    const presupuestols = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestols > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  // ? Este hook sirve para guar los cambios en localStorge
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])


  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(g => g.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }

  }, [filtro])



  /** FUNCIONES **/
  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {

      const gastosActualizados = gastos.map(gastoUP => gastoUP.id === gasto.id ? gasto : gastoUP);
      setGastos(gastosActualizados);

    } else {

      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([gasto, ...gastos]);

    }



    setModal(false);

    setTimeout(() => {
      setAnimarModal(false);
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosnt = gastos.filter(g => g.id != id);
    setGastos(gastosnt);
  }


  /** JSX **/
  return (
    <div className={modal ? 'fijar' : ''} >
      <Header
        gastos={gastos}
        setGastos={setGastos}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      />

      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadosGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGato}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>


          </>
        )

      }

      {
        modal && <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }


    </div>
  )
}

export default App
