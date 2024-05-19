import { Fragment, useState } from 'react';
import { deleteCharacter } from '../store/slices/character';
import { deleteSerieMovie } from '../store/slices/seriemovie';
import { mapSerieMovieToDetailsCardElement } from '../utils/mappers/seriemovie.mapper';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import ModalComponent from '../components/home/ModalComponent';
import EditCharacterFormComponent from '../components/home/EditCharacterFormComponent';
import EditSerieMovieFormComponent from '../components/home/EditSerieMovieFormComponent';
import useAlert from '../hooks/useAlert.hook';
import useCharacter from '../hooks/useCharacter.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import useSerieMovie from '../hooks/useSerieMovie.hook';

const HomePage = () => {

    const { characterSelected } = useSelector(
        (state: RootState) => state.character);

    const { serieMovieSelected } = useSelector(
        (state: RootState) => state.serieMovie);

    const { alert } = useSelector(
        (state: RootState) => state.common);

    const { hideAlert } = useAlert();
    const { } = useCharacter();
    const { } = useSerieMovie();

    const [modalOpen, setModalOpen] = useState(false);
    const [sectionSelected, setSectionSelected] = useState<TypSection>("characters");
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
            {(alert) && (
                <FloatingAlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            )}
            <div>
                <SidebarComponent setSectionSelected={setSectionSelected} />
            </div>
            {sectionSelected === "characters" && (
                <Fragment>
                    <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                        <EditCharacterFormComponent
                            setModalOpen={setModalOpen}
                        />
                    </ModalComponent>
                    <SearchElementComponent
                        setFilteredCharacters={setCharactersFilters}
                        setFilteredSeriesMovies={() => { }}
                        flag={sectionSelected}
                    />
                    <SectionComponent
                        titleSection={"Personaje"}
                        titleListSection={"Listado de Personajes"}
                        detailElement={characterDto}
                        detailLabels={detailLabelsCharacter}
                        listElement={charactersFilters?.map(e => mapCharacterToDetailsCardElement(e)) ?? []}
                        editElement={handleOpenModal}
                        deleteElement={deleteCharacter}
                        sectionSelected={sectionSelected}
                    />
                </Fragment>
            ) || sectionSelected === "products" && (
                <Fragment>
                    <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                        <EditSerieMovieFormComponent
                            setModalOpen={setModalOpen}
                        />
                    </ModalComponent>
                    <SearchElementComponent
                        setFilteredSeriesMovies={setSeriesMoviesFilters}
                        setFilteredCharacters={() => { }}
                        flag={sectionSelected}
                    />
                    <SectionComponent
                        titleSection={"Serie / Película"}
                        titleListSection={"Listado de Series y Peliculas"}
                        detailElement={serieMovieDto}
                        detailLabels={detailLabelsSerieMovie}
                        listElement={seriesMoviesFilters?.map(e => mapSerieMovieToDetailsCardElement(e)) ?? []}
                        editElement={handleOpenModal}
                        deleteElement={deleteSerieMovie}
                        sectionSelected={sectionSelected}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;