export default function Informacion({ nombreLocal, localidadLocal, tipo, turismo, description }) {
    return (
        <section id="informacion">
            <h1>Información del local seleccionado</h1>
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" value={nombreLocal} disabled />

            <label htmlFor="localidad">Localidad</label>
            <input type="text" name="localidad" value={localidadLocal} disabled />

            <h1>Información adicional</h1>
            <label htmlFor="tipo">Tipo</label>
            <input type="text" name="tipo" value={tipo} disabled />
            <br /><br />

            <label htmlFor="turismo">Turismo euskadi</label>
            <input type="text" name="turismo" value={turismo} disabled />

            <br /><br />

            <label htmlFor="description">Descripción</label>
            <textarea name="description" disabled rows={5} cols={30} value={description}></textarea>
        </section>
    );
}