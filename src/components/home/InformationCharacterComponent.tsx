import { Fragment, useState } from 'react';

import { Typography } from '@mui/material';

import { ButtonComponent } from '../common/ButtonComponent';
import DialogComponent from '../common/DialogComponent';
import useSession from '../../hooks/useSession.hook';


interface InformationCharacterComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    deleteElement: () => void;
    updateElement: () => void;
}

const InformationCharacterComponent = ({ element, label, deleteElement, updateElement }: InformationCharacterComponentProps) => {

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleDeleteCharacter = () => {
        deleteElement();
        handleCloseDialog();
    }

    return (
        <Fragment>
            <Typography gutterBottom variant="h5" component="h2">
                {element.field1}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label1} {element.field2}
            </Typography>
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} variant="body2" color="textSecondary" component="p">
                {label.label2} {element.field3}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label3} {element.field4}
            </Typography>
            <hr />
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label4} {(element.list1.length === 0) ? "Sin información." : element.list1.filter(Boolean).join(", ") + "."}
            </Typography>
            <ButtonComponent
                isAuthenticated={isAuthenticated}
                isAuthorized={handleValidateAuthorization('0504')}
                label={'Editar'}
                margin={'20px 4px'}
                size={'small'}
                onClick={updateElement}
            />
            <ButtonComponent
                isAuthenticated={isAuthenticated}
                isAuthorized={handleValidateAuthorization('0505')}
                label={'Eliminar'}
                margin={'20px 4px'}
                size={'small'}
                onClick={() => setOpenDialog(true)}
            />
            <DialogComponent
                title={"Está seguro que desea eliminar este personaje?"}
                description={"Luego de eliminar el personaje no podrá reversar esta operación."}
                open={openDialog}
                handleClose={handleCloseDialog}
                action={handleDeleteCharacter} />
        </Fragment>
    );
}

export default InformationCharacterComponent;