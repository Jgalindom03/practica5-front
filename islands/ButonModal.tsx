import Preact, { FunctionComponent, useState } from 'preact/hooks';
import FuncionesModal from './FuncionesModal.tsx';

type ButtonModalProps = {
    film_id: string;
}

export const openSection = (section_id:string) => {
    const section = document.getElementById(section_id);
    if(section) section.style.display = "block";
    else console.log("Section not found");
}

const ButonModal: FunctionComponent<ButtonModalProps> = ({ film_id }) => {
    const [showModal, setModal] = useState<boolean>(false);

    const handleClick = () => {
        setModal(true);
        id_signal.value = film_id;
    };
    
    return (
        <>
            <button className="button_modal" onClick={handleClick}>Add film to project</button>
            {showModal && <FuncionesModal film_id={film_id} />}
        </>
    );
}

export default ButonModal;
