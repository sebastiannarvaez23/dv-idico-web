import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PeopleIcon from '@mui/icons-material/People';
import BallotIcon from '@mui/icons-material/Ballot';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const NestedList = () => {

    const navigate = useNavigate();

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
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: "fixed", top: 64, left: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Configuración
                </ListSubheader>
            }>
            <ListItemButton onClick={() => navigate('/settings/users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
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
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/settings/services')}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Servicios" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/settings/roles')}>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Roles" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SettingsAccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gestionar Permisos" />
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
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/settings/kinds')}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tipos de Producto" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
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

export default NestedList;