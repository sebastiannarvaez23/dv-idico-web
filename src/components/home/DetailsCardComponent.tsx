import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/loading.json';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { DeleteElementFunction } from '../../types/TypDeleteElementFunction';

interface DetailsCardComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    deleteElement: DeleteElementFunction;
    editElement: () => void;
}

const DetailsCardComponent = ({ element, label, editElement, deleteElement }: DetailsCardComponentProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoadingCharacterSelected } = useSelector(
        (state: RootState) => state.character);

    const { isLoadingProductSelected } = useSelector(
        (state: RootState) => state.product);

    return (
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <Grid style={{ width: '90%', margin: '0 auto' }} container >
                {/* Parte izquierda: Imagen */}
                <Grid item xs={12} sm={5}>
                    {(isLoadingCharacterSelected || isLoadingProductSelected) ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '340px' }}>
                            <Lottie animationData={loadingAnimation} style={{
                                width: '100%',
                                height: '340px', borderRadius: '10px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)'
                            }} />
                        </div>
                    ) : (
                        <CardMedia
                            component="img"
                            style={{
                                width: '100%',
                                height: '340px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)'
                            }}
                            image={element.image1 as string}
                        />
                    )}
                </Grid>
                {/* Parte derecha: Información */}
                <Grid item xs={12} sm={7}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {element.field1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {label.label1} {element.field2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {label.label2} {element.field3}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {label.label3} {element.field4}
                        </Typography>
                        <hr />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {label.label4} {element.list1.map(e => "title" in e ? e.title : e.name).filter(Boolean).join(", ")}.
                        </Typography>
                        <Button sx={{ backgroundColor: '#161732' }} onClick={editElement} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                            editar
                        </Button>
                        <Button sx={{ backgroundColor: '#161732' }} onClick={() => { dispatch(deleteElement()) }} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                            Eliminar
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DetailsCardComponent;
