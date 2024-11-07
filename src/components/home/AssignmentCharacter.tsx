import react from "react";
import ModalComponent from "./ModalComponent";

interface AssignmentCharacterProps {
    modalAssigmentCharacter: boolean;
    handleCloseModalAssigmentCharacter: () => void;
}
const AssignmentCharacter = ({ modalAssigmentCharacter, handleCloseModalAssigmentCharacter }: AssignmentCharacterProps) => {
    return (
        <ModalComponent
            width={40}
            open={modalAssigmentCharacter}
            onClose={handleCloseModalAssigmentCharacter}>
            <div><h1>Asignar Personajes</h1></div>
        </ModalComponent>
    );
}

export default AssignmentCharacter;