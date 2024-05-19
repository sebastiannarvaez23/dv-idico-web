import { Fragment, useState } from 'react';
import { deleteCharacter } from '../store/slices/character';
import { deleteProduct } from '../store/slices/product';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import ModalComponent from '../components/home/ModalComponent';
import EditCharacterFormComponent from '../components/home/EditCharacterFormComponent';
import EditProductFormComponent from '../components/home/EditProductFormComponent';
import useAlert from '../hooks/useAlert.hook';
import useCharacter from '../hooks/useCharacter.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import useProduct from '../hooks/useProduct.hook';

const HomePage = () => {

    const { characterSelected } = useSelector(
        (state: RootState) => state.character);

    const { productSelected } = useSelector(
        (state: RootState) => state.product);

    const { alert } = useSelector(
        (state: RootState) => state.common);

    const { hideAlert } = useAlert();
    const { } = useCharacter();
    const { } = useProduct();

    const [modalOpen, setModalOpen] = useState(false);
    const [sectionSelected, setSectionSelected] = useState<TypSection>("characters");
    const [charactersFilters, setCharactersFilters] = useState<Character[]>();
    const [seriesMoviesFilters, setProductsFilters] = useState<Product[]>();

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad: ",
        label2: "Peso (kg): ",
        label3: "Historia del Personaje: ",
        label4: "Películas y/ o Series: "
    }

    const detailLabelsProduct: DetailsLabelCardElement = {
        label1: "Fecha de salida: ",
        label2: "Calificación: ",
        label3: "Género: ",
        label4: "Personajes: "
    }

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);
    const productDto: DetailsCardElement = mapProductToDetailsCardElement(productSelected);

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
                        setFilteredProducts={() => { }}
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
                        <EditProductFormComponent
                            setModalOpen={setModalOpen}
                        />
                    </ModalComponent>
                    <SearchElementComponent
                        setFilteredProducts={setProductsFilters}
                        setFilteredCharacters={() => { }}
                        flag={sectionSelected}
                    />
                    <SectionComponent
                        titleSection={"Serie / Película"}
                        titleListSection={"Listado de Series y Peliculas"}
                        detailElement={productDto}
                        detailLabels={detailLabelsProduct}
                        listElement={seriesMoviesFilters?.map(e => mapProductToDetailsCardElement(e)) ?? []}
                        editElement={handleOpenModal}
                        deleteElement={deleteProduct}
                        sectionSelected={sectionSelected}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

export default HomePage;