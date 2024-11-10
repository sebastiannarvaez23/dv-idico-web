import { Fragment } from "react";
import { RootState } from "../store/store";
import { useSelector } from 'react-redux';
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import Typography from '@mui/material/Typography';
import usePerson from "../hooks/usePerson.hook";

const SettingsUserPage = () => {

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

    const { handleGetPersons } = usePerson();

    const { persons } = useSelector(
        (state: RootState) => state.person);

    return (<Fragment>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Personas</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de personas</Typography>

            <TableComponent
                data={persons}
                totalRows={12}
                headers={headCells}
                title={"Personas"}
                changePage={handleGetPersons} />

        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsUserPage;