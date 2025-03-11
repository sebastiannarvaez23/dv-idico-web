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
            sx={{ zIndex: '100', boxShadow: '7px 0 7px -3px rgba(0, 0, 0, 0.5)', height: '100vh', width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: "fixed", top: 64, left: 0 }}
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
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/settings/genders')}>
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