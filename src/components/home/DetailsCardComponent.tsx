import { Card, CardContent, Grid } from '@mui/material';

import Lottie from 'lottie-react';

import { ImageComponent } from '../common/ImageComponent';
import loadingAnimation from '../../../public/loading.json';
import useCharacter from '../../hooks/useCharacter.hook';
import useProduct from '../../hooks/useProduct.hook';


interface DetailsCardComponentProps {
    element: DetailsCardElement;
    children?: React.ReactNode;
}

const DetailsCardComponent = ({ element, children }: DetailsCardComponentProps) => {

    const { isLoadingCharacterSelected } = useCharacter();
    const { isLoadingProductSelected } = useProduct();

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
                        <ImageComponent
                            image={element.image1 as string}
                            alt={`Imagen de ${element.field1}`}
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
