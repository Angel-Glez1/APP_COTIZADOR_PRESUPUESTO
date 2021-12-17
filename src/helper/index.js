export const generarID = () => {

    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);

    return random + date;


}

export const formatCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const formateFecha = fecha => {
    const fechaNew = new Date(fecha);
    
    const options = {
        year : 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNew.toLocaleDateString('es-ES', options);

}