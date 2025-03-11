import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { createKind, updateKind } from "../store/slices/kind";
import { RootState } from "../store/store";
import FormKindComponent from "../components/settings/FormKindComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useKind from "../hooks/useKind.hook";


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

    const { kindEmpty, handleGetKinds } = useKind();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [kindSelected, setKindSelected] = useState<Kind>(kindEmpty);

    const { kinds, count } = useSelector(
        (state: RootState) => state.kind);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const kind = kinds.find(e => e.id === id);
        kind && setKindSelected(kind);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setKindSelected(kindEmpty);
    }

    return (<Fragment>
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormKindComponent
                setModalOpen={setOpenModel}
                kindSelected={kindSelected}
                title={kindSelected.id ? "Editar tipo de producto" : "Crear tipo de producto"}
                action={kindSelected.id ? updateKind : createKind}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Tipos de Producto</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de tipos de producto</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={handleOpenModal}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear tipo de producto
                </Button>
            </Box>
            <TableComponent
                editable={true}
                deleteable={false}
                onEdit={handleEdit}
                data={kinds}
                totalRows={count}
                headers={headCells}
                title={"Tipos de producto"}
                changePage={handleGetKinds} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsKindsPage;