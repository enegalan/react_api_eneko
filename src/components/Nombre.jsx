import { useState } from 'react'
import '../App.css'



export default function Nombre () {
    const [nombre, setNombre] = useState('');
    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };
    return (
        <input type="text" value={nombre} placeholder="Nombre y Apellidos" onChange={handleNombreChange}/>
    );
}