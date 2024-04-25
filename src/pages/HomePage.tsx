import { Fragment, useState } from 'react';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SerachElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import img from '../assets/images/descarga.jpeg';
import TheGreatAdventure from '../assets/images/The Great Adventure.jpg';
import { mapCharacterToDetailsCardElement, mapSerieMovieToDetailsCardElement } from '../utils/mappers/character';

function HomePage() {

    const [sectionSelected, setSectionSelected] = useState("Peliculas");

    const character: Character = {
        name: "Luke Skywalker",
        age: 25,
        weight: 75,
        story: "Luke Skywalker is a fictional character and the main protagonist of the original film trilogy of the Star Wars franchise.",
        image: img,
        seriesmovies: ["Alameda", "San Judas", "Melendez"]
    };

    const serieMovie: SerieMovie = {
        title: "The Great Adventure",
        image: TheGreatAdventure,
        created_date: "2023-09-15",
        qualification: 4.7,
        gender: "Action",
        characters: ["John Smith", "Jane Doe", "Michael Johnson"]
    }

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad:",
        label2: "Peso:",
        label3: "Historia del Personaje:",
        label4: "Películas y/ o Series:"
    }

    const detailLabelsSerieMovie: DetailsLabelCardElement = {
        label1: "Fecha de salida:",
        label2: "Calificación:",
        label3: "Género:",
        label4: "Personajes:"
    }

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(character);
    const serieMovieDto: DetailsCardElement = mapSerieMovieToDetailsCardElement(serieMovie);

    return (
        <Fragment>
            <div>
                <SidebarComponent setSectionSelected={setSectionSelected} />
            </div>
            {sectionSelected === "Personajes" && (
                <Fragment>
                    <SearchElementComponent />
                    <SectionComponent
                        detailElement={characterDto}
                        detailLabels={detailLabelsCharacter}
                        listElement={[characterDto, characterDto, characterDto, characterDto]}
                    />
                </Fragment>
            ) || sectionSelected === "Peliculas" && (
                <Fragment>
                    <SearchElementComponent />
                    <SectionComponent
                        detailElement={serieMovieDto}
                        detailLabels={detailLabelsSerieMovie}
                        listElement={[serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto, serieMovieDto,]}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;

