import '../App.css'
import Informacion from './Informacion';

export default function Municipio({ municipios,
    entornos,
    handleMunicipioChange,
    handleEntornoChange,
    nombreLocal,
    localidadLocal,
    tipo,
    turismo,
    description, }) {
    return (
        <section id="municipios">
            <label htmlFor="municipio">Municipio</label>
            <select onChange={handleMunicipioChange} name="municipio" id="municipio">
                {municipios.length > 0 && municipios instanceof Array ? (

                    municipios.map((municipio) => (
                        <option key={municipio} value={municipio}>
                            {municipio}
                        </option>
                    ))
                ) : (
                    <option value={municipios}>
                        {municipios}
                    </option>
                )}
            </select>

            <label htmlFor="entorno">Entorno natural</label>
            <select onChange={handleEntornoChange} name="entorno" id="entorno">
                {entornos.length > 0 && entornos instanceof Array ? (

                    entornos.map((entorno) => (
                        <option key={entorno} value={entorno}>
                            {entorno}
                        </option>
                    ))
                ) : (
                    <option value={entornos}>
                        {entornos}
                    </option>
                )}
            </select>
            <Informacion
                nombreLocal={nombreLocal}
                localidadLocal={localidadLocal}
                tipo={tipo}
                turismo={turismo}
                description={description}
            />
        </section>
    );
}