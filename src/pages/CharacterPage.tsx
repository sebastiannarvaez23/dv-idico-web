import { Fragment, useState } from 'react';

import { Button } from '@mui/material';

import { createCharacter, deleteCharacter, updateCharacter } from '../store/slices/character';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormCharacterComponent from '../components/home/FormCharacterComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useCharacter from '../hooks/useCharacter.hook';
import InformationCharacterComponent from '../components/home/InformationCharacterComponent';


const CharacterPage = () => {

    const SECTION: TypSection = "characters";

    const { characters, characterSelected, count } = useSelector(
        (state: RootState) => state.character);

    const [charactersFilters, setCharactersFilters] = useState<Character[]>();
    const [page, setPage] = useState<number>(1);

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);

    const {
        characterEmpty,
        detailLabelsCharacter,
        modalCreateCharacter,
        modalEditCharacter,
        handleGetCharacters,
        setModalEditCharacter,
        setModalCreateCharacter,
        handleOpenModalEditCharacter,
        handleCloseModalEditCharacter,
        handleOpenModalCreateCharacter,
        handleCloseModalCreateCharacter
    } = useCharacter();

    return (
        <Fragment>
            <ModalComponent
                width={50}
                open={modalCreateCharacter}
                onClose={handleCloseModalCreateCharacter}>
                <FormCharacterComponent
                    title="Agregar Personaje"
                    setModalOpen={setModalCreateCharacter}
                    characterSelected={characterEmpty}
                    action={createCharacter}
                    page={page}
                />
            </ModalComponent>
            <ModalComponent
                width={50}
                open={modalEditCharacter}
                onClose={handleCloseModalEditCharacter}>
                <FormCharacterComponent title="Editar Personaje"
                    setModalOpen={setModalEditCharacter}
                    characterSelected={characterSelected}
                    action={updateCharacter}
                    page={page}
                />
            </ModalComponent>
            <SearchElementComponent
                setFilteredCharacters={setCharactersFilters}
                setFilteredProducts={() => { }}
                flag={SECTION}
            />
            <ContainerSectionComponent
                titleSection={"Personaje"}
                titleListSection={"Listado de Personajes"}
                detailElement={characterDto}
                detailLabels={detailLabelsCharacter}
                totalRows={count}
                page={page}
                setPage={setPage}
                handleGetElements={handleGetCharacters}
                listElement={characters?.map(e => mapCharacterToDetailsCardElement(e)) ?? []}
                editElement={handleOpenModalEditCharacter}
                deleteElement={deleteCharacter}
                sectionSelected={SECTION}>
                <InformationCharacterComponent
                    element={characterDto}
                    label={detailLabelsCharacter}
                    deleteElement={deleteCharacter}
                    editElement={handleOpenModalEditCharacter} />
            </ContainerSectionComponent>
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
    );
}

export default CharacterPage;