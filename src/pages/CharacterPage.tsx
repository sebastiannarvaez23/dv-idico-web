import { Fragment, useState } from 'react';
import { createCharacter, deleteCharacter, updateCharacter } from '../store/slices/character';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SearchElementComponent from '../components/home/SearchElementComponent';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import ModalComponent from '../components/common/ModalComponent';
import useCharacter from '../hooks/useCharacter.hook';
import FormCharacterComponent from '../components/home/FormCharacterComponent';

const CharacterPage = () => {

    const SECTION: TypSection = "characters";

    const { characterSelected } = useSelector(
        (state: RootState) => state.character);

    const [charactersFilters, setCharactersFilters] = useState<Character[]>();

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);

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
                    action={createCharacter} />
            </ModalComponent>
            <ModalComponent
                width={50}
                open={modalEditCharacter}
                onClose={handleCloseModalEditCharacter}>
                <FormCharacterComponent title="Editar Personaje"
                    setModalOpen={setModalEditCharacter}
                    characterSelected={characterSelected}
                    action={updateCharacter}
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
                listElement={charactersFilters?.map(e => mapCharacterToDetailsCardElement(e)) ?? []}
                editElement={handleOpenModalEditCharacter}
                deleteElement={deleteCharacter}
                sectionSelected={SECTION}
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
    );
}

export default CharacterPage;