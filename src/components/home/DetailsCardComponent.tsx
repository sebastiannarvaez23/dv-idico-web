import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { deleteCharacter } from '../../store/slices/character';

interface DetailsCardComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    editElement: () => void;
}

const DetailsCardComponent = ({ element, label, editElement }: DetailsCardComponentProps) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <Grid style={{ width: '90%', margin: '0 auto' }} container >
                {/* Parte izquierda: Imagen */}
                <Grid item xs={12} sm={5}>
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
                            {label.label4} {element.list1?.join(', ')}
                        </Typography>
                        <Button sx={{ backgroundColor: '#161732' }} onClick={editElement} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                            editar
                        </Button>
                        <Button sx={{ backgroundColor: '#161732' }} onClick={() => { dispatch(deleteCharacter()) }} size='small' style={{ margin: '20px 4px' }} variant="contained" color="primary">
                            Eliminar
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DetailsCardComponent;
