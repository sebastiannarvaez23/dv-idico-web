import { Fragment } from "react";
import EnhancedTable from "../components/common/TableComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const SettingsUserPage = () => {
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
            <EnhancedTable />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsUserPage;