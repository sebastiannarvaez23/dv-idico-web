import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { ButtonComponent } from '../components/common/ButtonComponent';
import { createCharacter, deleteCharacter, updateCharacter } from '../store/slices/character';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import { RootState } from '../store/store';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormCharacterComponent from '../components/home/FormCharacterComponent';
import InformationCharacterComponent from '../components/home/InformationCharacterComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useCharacter from '../hooks/useCharacter.hook';
import useSession from '../hooks/useSession.hook';


const CharacterPage = () => {

    const SECTION: TypSection = "characters";

    const { characters, characterSelected, count, page, filter } = useSelector(
        (state: RootState) => state.character);

    const { handleValidateAuthorization } = useSession();

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
                <FormCharacterComponent
                    title="Editar Personaje"
                    setModalOpen={setModalEditCharacter}
                    characterSelected={characterSelected}
                    action={updateCharacter}
                    page={page}
                />
            </ModalComponent>
            <SearchElementComponent
                handleGetCharacters={handleGetCharacters}
                flag={SECTION}
            />
            <ContainerSectionComponent
                titleSection={"Personaje"}
                titleListSection={"Listado de Personajes"}
                detailElement={characterDto}
                totalRows={count}
                page={page}
                filter={filter}
                handleGetElements={handleGetCharacters}
                listElement={characters?.map(e => mapCharacterToDetailsCardElement(e)) ?? []}
                sectionSelected={SECTION}>
                <InformationCharacterComponent
                    element={characterDto}
                    label={detailLabelsCharacter}
                    deleteElement={deleteCharacter}
                    editElement={handleOpenModalEditCharacter} />
            </ContainerSectionComponent>
            <ButtonComponent
                authorization={handleValidateAuthorization('0503')}
                label={'Agregar Personaje'}
                margin={'20px 4px'}
                size={'large'}
                onClick={handleOpenModalCreateCharacter}
            />
        </Fragment>
    );
}

export default CharacterPage;