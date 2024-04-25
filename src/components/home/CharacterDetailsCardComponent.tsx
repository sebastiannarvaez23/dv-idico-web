import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface Character {
    name: string;
    age: number;
    weight: number;
    story: string;
    imageUrl: string;
    seriesmovies: string[];
}

interface CharacterDetailsCardProps {
    character: Character;
}

function CharacterDetailsCard({ character }: CharacterDetailsCardProps) {
    return (
        <Card style={{ marginBottom: '20px' }}>
            <Grid container>
                {/* Parte izquierda: Imagen */}
                <Grid item xs={12} sm={5}>
                    <CardMedia
                        component="img"
                        style={{ width: '100%', height: 'auto' }}
                        image={character.imageUrl}
                        alt={`Imagen de ${character.name}`}
                    />
                </Grid>
                {/* Parte derecha: Contenido */}
                <Grid item xs={12} sm={7}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {character.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Edad: {character.age} años
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Peso: {character.weight} kg
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Historia del Personaje: {character.story}
                        </Typography>
                        <hr />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Películas y/o Series: {character.seriesmovies.join(', ')}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CharacterDetailsCard;
