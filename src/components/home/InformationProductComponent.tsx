import { Fragment, useState } from 'react';

import { Typography } from '@mui/material';

import { ButtonComponent } from '../common/ButtonComponent';
import DialogComponent from '../common/DialogComponent';
import useSession from '../../hooks/useSession.hook';


interface InformationProductComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    deleteElement: () => void;
    editElement: () => void;
    children: React.ReactNode;
}

const InformationProductComponent = ({ element, label, deleteElement, editElement, children }: InformationProductComponentProps) => {

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleDeleteProduct = () => {
        deleteElement();
        handleCloseDialog();
    }

    return (
        <Fragment>
            <Typography gutterBottom variant="h5" component="h2">
                {element.field1}
            </Typography>
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} variant="body2" color="textSecondary" component="p">
                {children}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label1} {element.field2}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label3} {element.field4}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {element.field5}
            </Typography>
            <br />
            <hr />
            <Typography variant="body2" color="textSecondary" component="p">
                {label.label4} {(element.list1.length === 0) ? "Sin información." : element.list1.filter(Boolean).join(", ") + "."}
            </Typography>
            <ButtonComponent
                isAuthenticated={isAuthenticated}
                isAuthorized={handleValidateAuthorization('0604')}
                label={'Editar'}
                margin={'20px 4px'}
                size={'small'}
                onClick={editElement}
            />
            <ButtonComponent
                isAuthenticated={isAuthenticated}
                isAuthorized={handleValidateAuthorization('0605')}
                label={'Eliminar'}
                margin={'20px 4px'}
                size={'small'}
                onClick={() => setOpenDialog(true)}
            />
            <DialogComponent
                title={"Está seguro que desea eliminar este producto?"}
                description={"Luego de eliminar el producto no podrá reversar esta operación."}
                open={openDialog}
                handleClose={handleCloseDialog}
                action={handleDeleteProduct} />
        </Fragment>
    );
}

export default InformationProductComponent;