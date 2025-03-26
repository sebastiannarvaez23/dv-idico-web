import { Fragment, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ButtonComponent } from "../components/common/ButtonComponent";
import { useDebounce } from "../hooks/useDebounce.hook";
import DialogComponent from "../components/common/DialogComponent";
import FormKindComponent from "../components/settings/FormKindComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useKind from "../hooks/useKind.hook";
import useSession from "../hooks/useSession.hook";


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

    const {
        kindEmpty,
        kinds,
        count,
        page,
        handleGetKinds,
        handleCreateKind,
        handleUpdateKind,
        handleDeleteKind,
    } = useKind();
    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [kindSelected, setKindSelected] = useState<Kind>(kindEmpty);
    const [searchNameValue, setSearchNameValue] = useState<string>('');

    const debounceSearchNameValue = useDebounce(searchNameValue, 500);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const kind = kinds.find(e => e.id === id);
        kind && setKindSelected(kind);
    }

    const handleCreate = (kind: Kind) => {
        handleCreateKind(kind);
    }

    const handleUpdate = (kind: Kind) => {
        handleUpdateKind(kind);
    }

    const handleDelete = () => {
        handleDeleteKind(kindSelected.id);
        setOpenDialog(false);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setKindSelected(kindEmpty);
    }

    const handleOpenDialog = (id: string) => {
        const kind = kinds.find(e => e.id === id);
        kind && setKindSelected(kind);
        setOpenDialog(true);
    }

    useEffect(() => {
        handleGetKinds(page, debounceSearchNameValue);
    }, [debounceSearchNameValue]);

    return (<Fragment>
        <DialogComponent
            title={"Está seguro que desea eliminar este tipo de producto?"}
            description={"Luego de eliminar el tipo de producto no podrá reversar esta operación."}
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            action={handleDelete} />
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormKindComponent
                setModalOpen={setOpenModel}
                kindSelected={kindSelected}
                title={kindSelected.id ? "Editar tipo de producto" : "Crear tipo de producto"}
                page={page}
                action={kindSelected.id ? handleUpdate : handleCreate} />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Tipos de Producto</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de tipos de producto</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonComponent
                    isAuthenticated={isAuthenticated}
                    isAuthorized={handleValidateAuthorization('0703')}
                    label={'Crear tipo de producto'}
                    margin={'0px 0px 20px 0px'}
                    size={'large'}
                    onClick={handleOpenModal}
                />
            </Box>
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setSearchNameValue(e.target.value)} />
            </Box>
            <TableComponent
                editable={handleValidateAuthorization('0704')}
                deleteable={handleValidateAuthorization('0705')}
                data={kinds}
                totalRows={count}
                headers={headCells}
                title={"Tipos de producto"}
                filters={[debounceSearchNameValue]}
                page={page}
                onEdit={handleEdit}
                onDelete={handleOpenDialog}
                changePage={handleGetKinds} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsKindsPage;