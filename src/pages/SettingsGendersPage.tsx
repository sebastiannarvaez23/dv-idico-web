import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { RootState } from "../store/store";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useGender from "../hooks/useGender.hook";
import ModalComponent from "../components/common/ModalComponent";
import FormGenderComponent from "../components/settings/FormGenderComponent";
import { createGender } from "../store/slices/gender";


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

    const [openModal, setOpenModel] = useState<boolean>(false);

    const { handleGetGenders, genderEmpty } = useGender();

    const { genders, count } = useSelector(
        (state: RootState) => state.gender);

    return (
        <Fragment>
            <ModalComponent
                width={50}
                open={openModal}
                onClose={() => setOpenModel(false)}>
                <FormGenderComponent
                    setModalOpen={setOpenModel}
                    genderSelected={genderEmpty}
                    title={"Añadir género"}
                    action={createGender}
                />
            </ModalComponent>
            <SettingsLayoutComponent>
                <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Géneros de Producto</Typography>
                <hr />
                <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de géneros de producto</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={() => setOpenModel(true)}
                        sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                        size='large'
                        variant="contained"
                        color="primary">
                        Crear género de producto
                    </Button>
                </Box>
                <TableComponent
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