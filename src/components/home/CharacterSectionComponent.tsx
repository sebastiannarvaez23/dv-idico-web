import { Grid, Paper } from '@mui/material';
import CharacterDetailsCard from './CharacterDetailsCardComponent';
import '../../styles/CharacterSectionComponent.css';
import img from '../../assets/images/descarga.jpeg';
import CharacterListCardComponent from './CharacterListCardComponent';

interface Character {
    name: string;
    age: number;
    weight: number;
    story: string;
    imageUrl: string;
    seriesmovies: string[];
}

function CharacterSectionComponent() {

    const character: Character = {
        name: "Luke Skywalker",
        age: 25,
        weight: 75,
        story: "Luke Skywalker is a fictional character and the main protagonist of the original film trilogy of the Star Wars franchise.",
        imageUrl: img,
        seriesmovies: ["Alameda", "San Judas", "Melendez"]
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2>Personaje</h2>
                    <CharacterDetailsCard character={character} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2>Listado de Personajes</h2>
                    <CharacterListCardComponent characters={[
                        character,
                        character,
                        character,
                        character,
                        character,
                        character,
                        character,
                        character,
                        character,
                    ]} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default CharacterSectionComponent;
