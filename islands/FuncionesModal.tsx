import { FunctionComponent, useState } from 'preact/hooks';
import CreateProject from './CreateProject.tsx';
import AddToProject from './Addtoproject.tsx';
import { Signal } from "@preact/signals";

type ButtonModalProps ={
    film_id: string;
}

const FuncionesModal: FunctionComponent<ButtonModalProps> = ({ film_id }) => {
    const [showModal, setModal] = useState(true); 
    const signal_reboot = new Signal<boolean>(false);

    const handleCloseModal = () => {
        setModal(false);
    };

    return (
        <div>
            {showModal && (
                <div id="Modal" class="Modal_container">
                    <div class="modal_content">
                        <span class="close" onClick={handleCloseModal}>&times;</span>
                        <br/><br/>
                        <CreateProject film_id={film_id} reboot={signal_reboot}/>
                        <AddToProject film_id={film_id} reboot={signal_reboot}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FuncionesModal;
