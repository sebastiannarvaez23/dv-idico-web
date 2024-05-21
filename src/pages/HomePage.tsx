import { Fragment, useState } from 'react';
import { createCharacter, deleteCharacter, updateCharacter } from '../store/slices/character';
import { deleteProduct } from '../store/slices/product';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import SidebarComponent from '../components/home/SidebarComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import SectionComponent from '../components/home/SectionComponent';
import ModalComponent from '../components/home/ModalComponent';
import EditProductFormComponent from '../components/home/EditProductFormComponent';
import useAlert from '../hooks/useAlert.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import useProduct from '../hooks/useProduct.hook';
import CharacterFormComponent from '../components/home/CharacterFormComponent';
import useCharacter from '../hooks/useCharacter.hook';

const HomePage = () => {

    const { characterSelected } = useSelector(
        (state: RootState) => state.character);

    const { productSelected } = useSelector(
        (state: RootState) => state.product);

    const { alert } = useSelector(
        (state: RootState) => state.common);

    const { hideAlert } = useAlert();
    const { } = useProduct();
    const {
        characterEmpty,
        detailLabelsCharacter,
        modalCreateCharacter,
        modalEditCharacter,
        setModalEditCharacter,
        setModalCreateCharacter,
        handleOpenModalEditCharacter,
        handleCloseModalEditCharacter,
        handleOpenModalCreateCharacter,
        handleCloseModalCreateCharacter
    } = useCharacter();

    const [sectionSelected, setSectionSelected] = useState<TypSection>("characters");
    const [charactersFilters, setCharactersFilters] = useState<Character[]>();
    const [seriesMoviesFilters, setProductsFilters] = useState<Product[]>();

    const detailLabelsProduct: DetailsLabelCardElement = {
        label1: "Fecha de salida: ",
        label2: "Calificación: ",
        label3: "Género: ",
        label4: "Personajes: "
    }

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);
    const productDto: DetailsCardElement = mapProductToDetailsCardElement(productSelected);



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
                    <ModalComponent
                        open={modalCreateCharacter}
                        onClose={handleCloseModalCreateCharacter}>
                        <CharacterFormComponent
                            title="Agregar Personaje"
                            setModalOpen={setModalCreateCharacter}
                            characterSelected={characterEmpty}
                            action={createCharacter} />
                    </ModalComponent>
                    <ModalComponent
                        open={modalEditCharacter}
                        onClose={handleCloseModalEditCharacter}>
                        <CharacterFormComponent title="Editar Personaje"
                            setModalOpen={setModalEditCharacter}
                            characterSelected={characterSelected}
                            action={updateCharacter}
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
                        editElement={handleOpenModalEditCharacter}
                        deleteElement={deleteCharacter}
                        sectionSelected={sectionSelected}
                    />
                    <Button
                        onClick={handleOpenModalCreateCharacter}
                        sx={{ backgroundColor: '#161732' }}
                        size='large'
                        style={{ margin: '20px 4px' }}
                        variant="contained"
                        color="primary">
                        Agregar Personaje
                    </Button>
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
                    <Button sx={{ backgroundColor: '#161732' }} size='large' style={{ margin: '20px 4px' }} variant="contained" color="primary">Agregar Producto</Button>
                    <Button sx={{ backgroundColor: '#161732' }} size='large' style={{ margin: '20px 4px' }} variant="contained" color="primary">Generos</Button>
                </Fragment>

            )}
        </Fragment>
    );
}

export default HomePage;