import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { createGender } from "../store/slices/gender";
import { RootState } from "../store/store";
import { updateGender } from '../store/slices/gender/thunks';
import FormGenderComponent from "../components/settings/FormGenderComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useGender from "../hooks/useGender.hook";


const SettingsGendersPage = () => {

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
        },
    ];

    const { handleGetGenders, genderEmpty } = useGender();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [genderSelected, setGenderSelected] = useState<Gender>(genderEmpty);

    const { genders, count } = useSelector(
        (state: RootState) => state.gender);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const gender = genders.find(e => e.id === id);
        gender && setGenderSelected(gender);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setGenderSelected(genderEmpty);
    }

    return (
        <Fragment>
            <ModalComponent
                width={50}
                open={openModal}
                onClose={() => setOpenModel(false)}>
                <FormGenderComponent
                    setModalOpen={setOpenModel}
                    genderSelected={genderEmpty}
                    title={genderSelected.id ? "Editar género" : "Crear género"}
                    action={genderSelected.id ? updateGender : createGender}
                />
            </ModalComponent>
            <SettingsLayoutComponent>
                <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Géneros de Producto</Typography>
                <hr />
                <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de géneros de producto</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={handleOpenModal}
                        sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                        size='large'
                        variant="contained"
                        color="primary">
                        Crear género de producto
                    </Button>
                </Box>
                <TableComponent
                    editable={true}
                    deleteable={false}
                    onEdit={handleEdit}
                    data={genders}
                    totalRows={count}
                    headers={headCells}
                    title={"Géneros de producto"}
                    changePage={handleGetGenders} />
            </SettingsLayoutComponent>
        </Fragment >
    )
}

export default SettingsGendersPage;