import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { RootState } from "../store/store";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useKind from "../hooks/useKind.hook";
import ModalComponent from "../components/common/ModalComponent";
import FormKindComponent from "../components/settings/FormKindComponent";
import { createKind } from "../store/slices/kind";


const SettingsKindsPage = () => {

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

    const { kindEmpty, handleGetKinds } = useKind();

    const { kinds, count } = useSelector(
        (state: RootState) => state.kind);

    return (<Fragment>
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormKindComponent
                setModalOpen={setOpenModel}
                kindSelected={kindEmpty}
                title={"Añadir tipo de producto"}
                action={createKind}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Tipos de Producto</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de tipos de producto</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => setOpenModel(true)}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear tipo de producto
                </Button>
            </Box>
            <TableComponent
                data={kinds}
                totalRows={count}
                headers={headCells}
                title={"Tipos de producto"}
                changePage={handleGetKinds} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsKindsPage;