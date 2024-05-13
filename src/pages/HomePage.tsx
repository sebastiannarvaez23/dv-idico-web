import { Fragment, useState } from 'react';
import { mapSerieMovieToDetailsCardElement } from '../utils/mappers/seriemovie.mapper';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import ModalComponent from '../components/home/ModalComponent';
import EditCharacterFormComponent from '../components/home/EditCharacterFormComponent';
import EditSerieMovieFormComponent from '../components/home/EditSerieMovieFormComponent';
import useAlert from '../hooks/useAlert.hook';
import useFetchingCharacter from '../hooks/useFetchingCharacter.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import useFetchingSerieMovie from '../hooks/useFetchingSerieMovie.hook';

const HomePage = () => {

    const { hideAlert, alert } = useAlert();
    const {
        alertApiC,
        characters,
        characterSelected,
        isLoadingCharacter,
        hideAlertApiC,
        updateCharacter,
        setCharacterSelected,
        fetchCharacters,
        handleDeleteCharacter
    } = useFetchingCharacter();

    const {
        alertApiSM,
        seriesMovies,
        serieMovieSelected,
        isLoadingSerieMovie,
        handleDeleteSerieMovie,
        fetchSeriesMovies,
        hideAlertApiSM,
        setSerieMovieSelected,
        updateSerieMovie
    } = useFetchingSerieMovie();

    const [modalOpen, setModalOpen] = useState(false);
    const [sectionSelected, setSectionSelected] = useState("Personajes");
    const [charactersFilters, setCharactersFilters] = useState<Character[]>();
    const [seriesMoviesFilters, setSeriesMoviesFilters] = useState<SerieMovie[]>();

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad: ",
        label2: "Peso (kg): ",
        label3: "Historia del Personaje: ",
        label4: "Películas y/ o Series: "
    }

    const detailLabelsSerieMovie: DetailsLabelCardElement = {
        label1: "Fecha de salida: ",
        label2: "Calificación: ",
        label3: "Género: ",
        label4: "Personajes: "
    }

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);
    const serieMovieDto: DetailsCardElement = mapSerieMovieToDetailsCardElement(serieMovieSelected);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Fragment>
            {alert && (
                <FloatingAlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            )}
            {alertApiC && (
                <FloatingAlertComponent
                    type={alertApiC.type}
                    message={alertApiC.message}
                    onClose={hideAlertApiC}
                />
            )}
            {alertApiSM && (
                <FloatingAlertComponent
                    type={alertApiSM.type}
                    message={alertApiSM.message}
                    onClose={hideAlertApiSM}
                />
            )}
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
                        isLoading={isLoadingCharacter}
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
                        isLoading={isLoadingSerieMovie}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;