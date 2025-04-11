import { Fragment } from 'react';

import { Box } from '@mui/system';

import { ButtonComponent } from '../components/common/ButtonComponent';
import { mapCharacterToDetailsCardElement } from '../utils/mappers/character.mapper';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormCharacterComponent from '../components/home/FormCharacterComponent';
import InformationCharacterComponent from '../components/home/InformationCharacterComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useCharacter from '../hooks/useCharacter.hook';
import useSession from '../hooks/useSession.hook';


const CharacterPage = () => {

    const SECTION: TypSection = "characters";

    const {
        characterEmpty,
        characters,
        characterSelected,
        count,
        detailLabelsCharacter,
        filter,
        modalCreateCharacter,
        modalEditCharacter,
        page,
        handleCloseModalCreateCharacter,
        handleCloseModalEditCharacter,
        handleCreateCharacter,
        handleDeleteCharacter,
        handleGetCharacters,
        handleOpenModalCreateCharacter,
        handleOpenModalEditCharacter,
        handleUpdateCharacter,
        setModalCreateCharacter,
        setModalEditCharacter,
    } = useCharacter();
    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const characterDto: DetailsCardElement = mapCharacterToDetailsCardElement(characterSelected);

    return (
        <Fragment>
            <Box sx={{ maxWidth: '1250px', margin: '0 auto' }}>
                <ModalComponent
                    width={50}
                    open={modalCreateCharacter}
                    onClose={handleCloseModalCreateCharacter}>
                    <FormCharacterComponent
                        title="Agregar Personaje"
                        setModalOpen={setModalCreateCharacter}
                        characterSelected={characterEmpty}
                        action={handleCreateCharacter}
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
                        action={handleUpdateCharacter}
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
                        deleteElement={handleDeleteCharacter}
                        updateElement={handleOpenModalEditCharacter} />
                </ContainerSectionComponent>
                <ButtonComponent
                    isAuthenticated={isAuthenticated}
                    isAuthorized={handleValidateAuthorization('0503')}
                    label={'Agregar Personaje'}
                    margin={'20px 4px'}
                    size={'large'}
                    onClick={handleOpenModalCreateCharacter}
                />
            </Box>
        </Fragment>
    );
}

export default CharacterPage;