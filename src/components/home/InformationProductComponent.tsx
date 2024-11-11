import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Typography } from '@mui/material';

import { DeleteElementFunction } from '../../types/TypDeleteElementFunction';
import { AppDispatch } from '../../store/store';


interface InformationProductComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    deleteElement: DeleteElementFunction;
    editElement: () => void;
    children: React.ReactNode;
}

const InformationProductComponent = ({ element, label, deleteElement, editElement, children }: InformationProductComponentProps) => {

    const dispatch = useDispatch<AppDispatch>();

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
                {label.label4} {(element.list1.length === 0) ? "Sin información." : element.list1.map(e => "title" in e ? e.title : e.name).filter(Boolean).join(", ") + "."}
            </Typography>
            <Button sx={{ backgroundColor: '#161732' }} onClick={editElement} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                editar
            </Button>
            <Button sx={{ backgroundColor: '#161732' }} onClick={() => { dispatch(deleteElement()) }} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                Eliminar
            </Button>
        </Fragment>
    );
}

export default InformationProductComponent;