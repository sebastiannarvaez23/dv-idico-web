import { Fragment, useEffect, useState } from 'react';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SerachElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character';
import { mapSerieMovieToDetailsCardElement } from '../utils/mappers/seriemovie';
import ModalComponent from '../components/home/ModalComponent';
import EditCharacterFormComponent from '../components/home/EditCharacterFormComponent';
import EditSerieMovieFormComponent from '../components/home/EditSerieMovieFormComponent';
import useAlert from '../hooks/useAlert.hook';
import useApiCharacter from '../hooks/useApiCharacter.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import useApiSerieMovie from '../hooks/useApiSerieMovie.hook';

const HomePage = () => {

    // hook

    const { showAlert, hideAlert, alert } = useAlert();
    const { getCharacters, getCharacter, deleteCharacter, alertApiC, hideAlertApiC, updateCharacter } = useApiCharacter();
    const { getSeriesMovies, deleteSerieMovie, alertApiSM, hideAlertApiSM, updateSerieMovie } = useApiSerieMovie();

    // useState

    const [modalOpen, setModalOpen] = useState(false);

    const [sectionSelected, setSectionSelected] = useState("Personajes");
    const [characterSelected, setCharacterSelected] = useState<Character>({
        id: "",
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
        id: "",
        title: "",
        image: "",
        created_date: "",
        qualification: "",
        gender: { id: "", name: "" },
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

    const handleDeleteCharacter = async () => {
        await deleteCharacter(characterSelected.id);
        await fetchCharacters();
    }

    const handleDeleteSerieMovie = async () => {
        await deleteSerieMovie(serieMovieSelected.id);
        await fetchSeriesMovies();
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // useEffect

    useEffect(() => {
        fetchSeriesMovies();
        fetchCharacters();
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        }
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    useEffect(() => {
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        };
    }, [characterSelected])

    return (
        <Fragment>
            {alert ? (
                <FloatingAlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            ) : null}
            {alertApiC ? (
                <FloatingAlertComponent
                    type={alertApiC.type}
                    message={alertApiC.message}
                    onClose={hideAlertApiC}
                />
            ) : null}
            {alertApiSM ? (
                <FloatingAlertComponent
                    type={alertApiSM.type}
                    message={alertApiSM.message}
                    onClose={hideAlertApiSM}
                />
            ) : null}
            <div>
                <SidebarComponent setSectionSelected={setSectionSelected} />
            </div>
            {sectionSelected === "Personajes" && (
                <Fragment>
                    <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                        <EditCharacterFormComponent
                            character={characterSelected}
                            setCharacterSelected={setCharacterSelected}
                            fetchCharacters={fetchCharacters}
                            setModalOpen={setModalOpen}
                            updateCharacter={updateCharacter}
                        />
                    </ModalComponent>
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
                        editElement={handleOpenModal}
                        deleteElement={handleDeleteCharacter}
                    />
                </Fragment>
            ) || sectionSelected === "Peliculas" && (
                <Fragment>
                    <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                        <EditSerieMovieFormComponent
                            serieMovie={serieMovieSelected}
                            setSerieMovieSelected={setSerieMovieSelected}
                            fetchSeriesMovies={fetchSeriesMovies}
                            setModalOpen={setModalOpen}
                            updateSerieMovie={updateSerieMovie}
                        />
                    </ModalComponent>
                    <SearchElementComponent
                        seriesmovies={seriesMovies ?? []}
                        setFilteredSeriesMovies={setSeriesMoviesFilters}
                        characters={[]}
                        setFilteredCharacters={() => { }}
                        flag={"seriemovie"}
                    />
                    <SectionComponent
                        titleSection={"Serie / Película"}
                        titleListSection={"Listado de Series y Peliculas"}
                        detailElement={serieMovieDto}
                        detailLabels={detailLabelsSerieMovie}
                        listElement={seriesMoviesFilters?.map(e => mapSerieMovieToDetailsCardElement(e)) ?? []}
                        setSerieMovieSelected={setSerieMovieSelected}
                        editElement={handleOpenModal}
                        deleteElement={handleDeleteSerieMovie}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;