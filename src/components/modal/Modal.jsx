import { useState } from 'react';
import CerrarBtn from '../../img/cerrar.svg';
import Mensaje from '../Mensaje';


export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('');
    const [formValues, setFormValues] = useState({ nombre: '', cantidad: '', categoria: '' });
    const { nombre, cantidad, categoria } = formValues;
    const [id, setId] = useState('');
    const [fecha, setfecha] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setFormValues({
                nombre: gastoEditar.nombre,
                cantidad: gastoEditar.cantidad, 
                categoria: gastoEditar.categoria
            });
            setId(gastoEditar.id)
            setfecha(gastoEditar.fecha)
        }
    }, []);


    const ocultarModal = () => {
        setGastoEditar({})
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);

        }, 500);
    }

    const handleChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: (target.name === 'cantidad') ? Number(target.value) : target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, categoria].includes('')) {
            setMensaje('Error! Todos los campos son obligatorios.');
            setTimeout(() => setMensaje(''), 2000);
            return;
        }

        if (cantidad <= 0) {
            setMensaje('Error! La cantidad tiene que se mayor a 0');
            setTimeout(() => setMensaje(''), 2000);
            return;
        }





        setMensaje('');
        guardarGasto({ nombre, cantidad, categoria, id, fecha });
        setGastoEditar({})
        




    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend> { gastoEditar.nombre ?  'Editar Gasto' : 'Nuevo gasto'} </legend>
                {mensaje && <Mensaje tipo='error' >{mensaje} </Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                        id="nombre"
                        placeholder="Nombre del gasto"
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Nombre Gasto</label>
                    <input
                        type="number"
                        name="cantidad"
                        onChange={handleChange}
                        value={cantidad}
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto: ejemplo $300"
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name="categoria"
                        id="categoria"
                        onChange={handleChange}
                        value={categoria}
                    >
                        <option value="">Seleccione</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={ gastoEditar.nombre ?  'Editar Gasto' : 'Nuevo gasto'}/>


            </form>

        </div>
    )
}
