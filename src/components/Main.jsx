import '../App.css'
import { useState, useEffect } from 'react';

import Provincia from './Provincia';
import Municipio from './Municipio';

export default function Main() {
    const [provincia, setProvincia] = useState('');
    const [municipios, setMunicipios] = useState([]);
    const [entornos, setEntornos] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState('');
    const [selectedEntorno, setSelectedEntorno] = useState('');

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

    useEffect(() => {
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

        fetchData();
    }, [provincia]);

    const fetchInfo = async () => {
        var data = await getData();
        setNombreLocal('');
        setLocalidadLocal('');
        setTipo('');
        setTurismo('');
        setDescription('');
        for (let i = 0; i < data.item.length; i++) {
            if (
                data.item[i]['municipality'] === selectedMunicipio &&
                data.item[i]['natureType'] === selectedEntorno
            ) {
                setNombreLocal(data.item[i]['documentName']);
                setLocalidadLocal(data.item[i]['locality'] || 'No locality');
                setTipo(data.item[i]['templateType'] || 'No type');
                setTurismo(data.item[i]['tourismEmail'] || 'No turism email');
                setDescription(data.item[i]['turismDescription'] || 'No description');
            }
        }
    };

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

    const handleProvinciaChange = (event) => {
        setProvincia(event.target.value);
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
        <main>
            <Provincia provincia={provincia} handleProvinciaChange={handleProvinciaChange} />
            <Municipio
                municipios={municipios}
                entornos={entornos}
                handleMunicipioChange={handleMunicipioChange}
                handleEntornoChange={handleEntornoChange}
                nombreLocal={nombreLocal}
                localidadLocal={localidadLocal}
                tipo={tipo}
                turismo={turismo}
                description={description}
            />
        </main>
    );
}