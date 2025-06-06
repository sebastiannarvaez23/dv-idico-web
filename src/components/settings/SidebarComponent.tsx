import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BallotIcon from '@mui/icons-material/Ballot';
import CategoryIcon from '@mui/icons-material/Category';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import StarBorder from '@mui/icons-material/StarBorder';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';

import useSession from '../../hooks/useSession.hook';


const SidebarComponent = () => {

    const navigate = useNavigate();
    const { handleValidateAuthorization } = useSession();

    const [openParameters, setOpenParameters] = React.useState(true);
    const [openSecurity, setOpenSecurity] = React.useState(true);

    const handleClickParameters = () => {
        setOpenParameters(!openParameters);
    };

    const handleClickSecurity = () => {
        setOpenSecurity(!openSecurity);
    };

    return (
        <List
            sx={{
                position: 'fixed', // ← inmoviliza
                top: '64px',       // ← debajo del Topbar
                left: 0,
                height: 'calc(100vh - 64px)', // ← ocupa toda la altura restante
                overflowY: 'auto',
                width: '270px',    // ← ancho fijo
                bgcolor: 'background.paper',
                boxShadow: '7px 0 7px -3px rgba(0, 0, 0, 0.5)',
                zIndex: 1100
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Configuración
                </ListSubheader>
            }>
            <ListItemButton
                disabled={!handleValidateAuthorization('0201')}
                onClick={() => navigate('/settings/persons')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Personas" />
            </ListItemButton>

            <ListItemButton onClick={handleClickSecurity}>
                <ListItemIcon>
                    <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Seguridad" />
                {openSecurity ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSecurity} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton
                        disabled={!handleValidateAuthorization('0401')}
                        sx={{ pl: 4 }}
                        onClick={() => navigate('/settings/users')}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Usuarios" />
                    </ListItemButton>

                    <ListItemButton
                        disabled={!handleValidateAuthorization('0401')}
                        sx={{ pl: 4 }}
                        onClick={() => navigate('/settings/services')}>
                        <ListItemIcon>
                            <SwitchAccessShortcutAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Servicios" />
                    </ListItemButton>

                    <ListItemButton
                        disabled={!handleValidateAuthorization('0301')}
                        sx={{ pl: 4 }}
                        onClick={() => navigate('/settings/roles')}>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Roles" />
                    </ListItemButton>

                </List>
            </Collapse>

            <ListItemButton onClick={handleClickParameters}>
                <ListItemIcon>
                    <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Parametros" />
                {openParameters ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openParameters} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton
                        disabled={!handleValidateAuthorization('0701')}
                        sx={{ pl: 4 }}
                        onClick={() => navigate('/settings/kinds')}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tipos de Producto" />
                    </ListItemButton>

                    <ListItemButton
                        disabled={!handleValidateAuthorization('0801')}
                        sx={{ pl: 4 }}
                        onClick={() => navigate('/settings/genders')}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Géneros" />
                    </ListItemButton>

                </List>
            </Collapse>
        </List>
    );
}

export default SidebarComponent;