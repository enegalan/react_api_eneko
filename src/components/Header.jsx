import '../App.css'

import Nombre from './Nombre';
import Titulo from './Titulo';

export default function Header () {
    return (
        <header>
            <Titulo />
            <Nombre />
        </header>
    );
}