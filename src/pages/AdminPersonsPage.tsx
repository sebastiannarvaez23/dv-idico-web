import { Fragment, useEffect, useState } from "react";

import Typography from '@mui/material/Typography';

import { Box } from "@mui/system";
import { Grid, TextField } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce.hook";
import FormPersonComponent from "../components/settings/FormPersonComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/AdminLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import usePerson from "../hooks/usePerson.hook";
import useSession from "../hooks/useSession.hook";


const AdminPersonsPage = () => {

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'firstName',
            numeric: false,
            disablePadding: true,
            label: 'Nombres'
        },
        {
            id: 'lastName',
            numeric: false,
            disablePadding: false,
            label: 'Apellidos',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: false,
            label: 'Teléfono',
        },
        {
            id: 'birthDate',
            numeric: false,
            disablePadding: false,
            label: 'Fec Nacimiento',
        },
    ];

    const { persons, count, page, personEmpty, handleGetPersons, handleUpdatePerson } = usePerson();
    const { handleValidateAuthorization } = useSession();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [personSelected, setPersonSelected] = useState<Person>(personEmpty);
    const [searchFirstNameValue, setSearchFirstNameValue] = useState<string>('');
    const [searchLastNameValue, setSearchLastNameValue] = useState<string>('');
    const [searchEmailValue, setSearchEmailValue] = useState<string>('');

    const debounceFirstNameValue = useDebounce(searchFirstNameValue, 500);
    const debounceSearchLastNameValue = useDebounce(searchLastNameValue, 500);
    const debounceSearchEmailValue = useDebounce(searchEmailValue, 500);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const person = persons.find(e => e.id === id);
        person && setPersonSelected(person);
    }

    const handleUpdate = (person: Person) => {
        handleUpdatePerson(person);
    }

    useEffect(() => {
        handleGetPersons(page, debounceFirstNameValue, debounceSearchLastNameValue, debounceSearchEmailValue);
    }, [debounceFirstNameValue, debounceSearchLastNameValue, debounceSearchEmailValue]);

    return (<Fragment>
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormPersonComponent
                setModalOpen={setOpenModel}
                personSelected={personSelected}
                title={"Editar persona"}
                page={page}
                action={handleUpdate}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Personas</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de personas</Typography>
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <Grid container sx={{ alignContent: 'center' }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            sx={{ width: '95%' }}
                            id="outlined-basic"
                            label="Nombres"
                            variant="outlined"
                            onChange={(e) => setSearchFirstNameValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            sx={{ width: '95%' }}
                            id="outlined-basic"
                            label="Apellidos"
                            variant="outlined"
                            onChange={(e) => setSearchLastNameValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            sx={{ width: '95%' }}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setSearchEmailValue(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <TableComponent
                editable={handleValidateAuthorization('0204')}
                deleteable={handleValidateAuthorization('0205')}
                data={persons}
                totalRows={count}
                headers={headCells}
                title={"Personas"}
                filters={[debounceFirstNameValue, debounceSearchLastNameValue, debounceSearchEmailValue]}
                page={page}
                onEdit={handleEdit}
                onDelete={() => { }}
                changePage={handleGetPersons} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default AdminPersonsPage;