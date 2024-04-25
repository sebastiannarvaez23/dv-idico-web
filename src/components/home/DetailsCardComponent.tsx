import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface ComponentDetailsCardProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
}

function DetailsCardComponent({ element, label }: ComponentDetailsCardProps) {
    return (
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <Grid style={{ width: '90%', margin: '0 auto' }} container >
                {/* Parte izquierda: Imagen */}
                <Grid item xs={12} sm={5}>
                    <CardMedia
                        component="img"
                        style={{ width: '100%', height: 'auto' }}
                        image={element.image1}
                    />
                </Grid>
                {/* Parte derecha: Contenido */}
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
                            {label.label4} {element.list1.join(', ')}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DetailsCardComponent;
