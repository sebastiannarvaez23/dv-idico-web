import { Fragment, useEffect, useState } from 'react';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SerachElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character';
import { mapSerieMovieToDetailsCardElement } from '../utils/mappers/seriemovie';
import { getSeriesMovies } from '../services/serie-movie';
import { getCharacter, getCharacters } from '../services/character';

function HomePage() {

    const [sectionSelected, setSectionSelected] = useState("Peliculas");
    const [characterSelected, setCharacterSelected] = useState<Character>({
        name: "",
        age: "",
        weight: "",
        history: "",
        image: "",
        endpoint: "",
        seriesMovies: [],
    });
    const [characters, setCharacters] = useState<Character[]>();
    const [charactersFilters, setCharactersFilters] = useState<Character[]>();
    const [serieMovieSelected, setSerieMovieSelected] = useState<SerieMovie>({
        title: "",
        image: "",
        created_date: "",
        qualification: "",
        gender: "",
        characters: []
    });
    const [seriesMovies, setSeriesMovies] = useState<SerieMovie[]>();
    const [seriesMoviesFilters, setSeriesMoviesFilters] = useState<SerieMovie[]>();

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad:",
        label2: "Peso (kg): ",
        label3: "Historia del Personaje:",
        label4: "Películas y/ o Series:"
    }

    const detailLabelsSerieMovie: DetailsLabelCardElement = {
        label1: "Fecha de salida:",
        label2: "Calificación:",
        label3: "Género:",
        label4: "Personajes:"
    }

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);
    const serieMovieDto: DetailsCardElement = mapSerieMovieToDetailsCardElement(serieMovieSelected);

    const fetchSeriesMovies = async () => {
        try {
            const seriesMoviesData = await getSeriesMovies();
            setSeriesMovies(seriesMoviesData);
            setSerieMovieSelected(seriesMoviesData[0]);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    };

    const fetchCharacters = async () => {
        try {
            const charactersData = await getCharacters();
            setCharacters(charactersData);
            setCharacterSelected(charactersData[0]);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    }

    const fetchCharacter = async (endpoint: string) => {
        try {
            const charactersData: Character = await getCharacter(endpoint);
            setCharacterSelected(charactersData);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    }

    useEffect(() => {
        fetchSeriesMovies();
        fetchCharacters();
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        }
    }, [])

    useEffect(() => {
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        };
    }, [characterSelected])

    return (
        <Fragment>
            <div>
                <SidebarComponent setSectionSelected={setSectionSelected} />
            </div>
            {sectionSelected === "Personajes" && (
                <Fragment>
                    <SearchElementComponent
                        characters={characters ?? []}
                        setFilteredCharacters={setCharactersFilters}
                        seriesmovies={[]}
                        setFilteredSeriesMovies={() => { }}
                        flag={"character"}
                    />
                    <SectionComponent
                        titleSection={"Personaje"}
                        titleListSection={"Listado de Personajes"}
                        detailElement={characterDto}
                        detailLabels={detailLabelsCharacter}
                        listElement={charactersFilters?.map(e => mapCharacterToDetailsCardElement(e)) ?? []}
                        setCharacterSelected={setCharacterSelected}
                    />
                </Fragment>
            ) || sectionSelected === "Peliculas" && (
                <Fragment>
                    <SearchElementComponent
                        seriesmovies={seriesMovies ?? []}
                        setFilteredSeriesMovies={setSeriesMoviesFilters}
                        characters={[]}
                        setFilteredCharacters={() => { }}
                        flag={"seriemovie"}
                    />
                    <SectionComponent
                        titleSection={"Serie o Película"}
                        titleListSection={"Listado de Series y Peliculas"}
                        detailElement={serieMovieDto}
                        detailLabels={detailLabelsSerieMovie}
                        listElement={seriesMoviesFilters?.map(e => mapSerieMovieToDetailsCardElement(e)) ?? []}
                        setSerieMovieSelected={setSerieMovieSelected}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;