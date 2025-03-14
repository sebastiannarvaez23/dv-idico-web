import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { AppDispatch, RootState } from "../store/store";
import { createKind, deleteKind, updateKind } from "../store/slices/kind";
import { useDebounce } from "../hooks/useDebounce.hook";
import DialogComponent from "../components/common/DialogComponent";
import FormKindComponent from "../components/settings/FormKindComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useKind from "../hooks/useKind.hook";


const SettingsKindsPage = () => {

    const { kinds, count, page } = useSelector(
        (state: RootState) => state.kind);

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

    const dispatch = useDispatch<AppDispatch>();

    const { kindEmpty, handleGetKinds } = useKind();

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

    const handleOpenModal = () => {
        setOpenModel(true);
        setKindSelected(kindEmpty);
    }

    const handleOpenDialog = (id: string) => {
        const kind = kinds.find(e => e.id === id);
        kind && setKindSelected(kind);
        setOpenDialog(true);
    }

    const handleDelete = () => {
        dispatch(deleteKind(kindSelected.id));
        setOpenDialog(false);
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
                action={kindSelected.id ? updateKind : createKind} />
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
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setSearchNameValue(e.target.value)} />
            </Box>
            <TableComponent
                editable={true}
                deleteable={true}
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