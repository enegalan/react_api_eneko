import '../App.css'

export default function Provincia ({ provincia, handleProvinciaChange }) {
    return (
        <section id="provincias">
            <h3>Provincia</h3>
            <form action="" method="post">
                <input type="radio" id="araba" name="provincia" value="Araba/Álava" checked={provincia === 'Araba/Álava'} onChange={handleProvinciaChange} />
                <label htmlFor="araba">Araba/Álava</label><br />

                <input type="radio" id="bizkaia" name="provincia" value="Bizkaia" checked={provincia === 'Bizkaia'} onChange={handleProvinciaChange} />
                <label htmlFor="bizkaia">Bizkaia</label><br />

                <input
                    type="radio"
                    id="gipuzkoa"
                    name="provincia"
                    value="Gipuzkoa"
                    checked={provincia === 'Gipuzkoa'}
                    onChange={handleProvinciaChange}
                />
                <label htmlFor="gipuzkoa">Gipuzkoa</label><br />
            </form>
        </section>
    );
}