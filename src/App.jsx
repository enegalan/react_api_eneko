import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [provincia, setProvincia] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [entornos, setEntornos] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [selectedEntorno, setSelectedEntorno] = useState('');
  const [nombre, setNombre] = useState('');

  const [nombreLocal, setNombreLocal] = useState('');
  const [localidadLocal, setLocalidadLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [turismo, setTurismo] = useState('');
  const [description, setDescription] = useState('');


  const getData = async () => {
    var data = null;
    try {
      const response = await fetch(`/espacios-naturales.json`);
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      data = await response.json();
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }

    return data;
  }

  const fetchData = async () => {
    if (provincia) {
      
        var data = await getData();

        if (data) {
          const municipiosArray = [];
          const entornosArray = [];
    
          for (let i = 0; i < data.item.length; i++) {
            if (data.item[i]['territory'] === provincia) {
              const municipio = data.item[i]['municipality'];
              const entorno = data.item[i]['natureType'];
    
              if (!municipiosArray.includes(municipio)) {
                municipiosArray.push(municipio);
              }
              if (!entornosArray.includes(entorno)) {
                entornosArray.push(entorno);
              }
            }
          }
    
          setMunicipios(municipiosArray);
          setEntornos(entornosArray);
          setSelectedMunicipio(municipiosArray[0]);
          setSelectedEntorno(entornosArray[0]);
          fetchInfo();
        }
      }
  };

  const fetchInfo = async () => {
    var data = await getData();
    console.log('fetching info');
    setNombreLocal("");
    setLocalidadLocal("");
    setTipo("");
    setTurismo("");
    setDescription("");
    for(let i = 0; i < data.item.length; i++) {
      if (data.item[i]['municipality'] == selectedMunicipio && data.item[i]['natureType'] == selectedEntorno) {
        setNombreLocal(data.item[i]['documentName']);
        setLocalidadLocal(data.item[i]['locality'] || "No locality");
        setTipo(data.item[i]['templateType'] || "No type");
        setTurismo(data.item[i]['tourismEmail'] || "No turism email");
        setDescription(data.item[i]['turismDescription'] || "No description");
      }
    }
  }
  // Check if there is an empty value
  if (nombreLocal == "") {
    setNombreLocal("No local name")
  }
  if (localidadLocal == "") {
    setLocalidadLocal("No locality")
  }
  if (tipo == "") {
    setTipo("No type")
  }
  if (turismo == "") {
    setTurismo("No turism email")
  }
  if (description == "") {
    setDescription("No description")
  }
  
  useEffect(() => {
    fetchData();
  }, [provincia]);


  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleMunicipioChange = (event) => {
    setSelectedMunicipio(event.target.value)
    fetchInfo();
  }

  const handleEntornoChange = (event) => {
    setSelectedEntorno(event.target.value)
    fetchInfo();
  }

  return (
    <>
        <header>
            <h1>Espacios naturales y playas de Euskadi</h1>
            <input type="text" value={nombre} placeholder="Nombre y Apellidos" onChange={handleNombreChange}/>
        </header>
        <main>
            <section id="provincias">
                <h3>Provincia</h3>
                <form action="" method="post">
                    <input type="radio" id="araba" name="provincia" value="Araba/Álava" checked={provincia === 'Araba/Álava'} onChange={handleProvinciaChange}/>
                    <label htmlFor="araba">Araba/Álava</label><br/>

                    <input type="radio" id="bizkaia" name="provincia" value="Bizkaia" checked={provincia === 'Bizkaia'} onChange={handleProvinciaChange}/>
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
                <section id="informacion">
                    <h1>Información del local seleccionado</h1>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" value={nombreLocal} disabled/>

                    <label htmlFor="localidad">Localidad</label>
                    <input type="text" name="localidad" value={localidadLocal} disabled/>

                    <h1>Información adicional</h1>
                    <label htmlFor="tipo">Tipo</label>
                    <input type="text" name="tipo" value={tipo} disabled/>

                    <br /><br />

                    <label htmlFor="turismo">Turismo euskadi</label>
                    <input type="text" name="turismo" value={turismo} disabled/>

                    <br /><br />

                    <label htmlFor="description">Descripción</label>
                    <textarea name="description" disabled rows={5} cols={30} value={description}></textarea>
                </section>
            </section>
        </main>
    </>
  )
}

export default App;
