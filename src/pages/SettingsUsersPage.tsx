import { Fragment } from "react";
import { RootState } from "../store/store";
import { useSelector } from 'react-redux';
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import Typography from '@mui/material/Typography';
import usePerson from "../hooks/usePerson.hook";

const SettingsUserPage = () => {

    usePerson();

    const { persons } = useSelector(
        (state: RootState) => state.person);

    return (<Fragment>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Personas</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de personas</Typography>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear persona
                </Button>
            </Box> */}
            {persons.length > 0 && (
                <TableComponent
                    data={persons}
                    title={"Personas"} />
            )}
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsUserPage;