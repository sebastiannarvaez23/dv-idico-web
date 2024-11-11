import { useSelector } from 'react-redux';

import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Lottie from 'lottie-react';

import loadingAnimation from '../../../public/loading.json';
import { RootState } from '../../store/store';
import { DeleteElementFunction } from '../../types/TypDeleteElementFunction';


interface DetailsCardComponentProps {
    element: DetailsCardElement;
    label: DetailsLabelCardElement;
    children?: React.ReactNode;
    deleteElement: DeleteElementFunction;
    editElement: () => void;
}

const DetailsCardComponent = ({ element, label, children, editElement, deleteElement }: DetailsCardComponentProps) => {


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
                        {children}
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DetailsCardComponent;
