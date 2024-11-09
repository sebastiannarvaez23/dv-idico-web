import { AppBar, Toolbar, Typography, IconButton, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SidebarComponent = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <AppBar sx={{ backgroundColor: '#161732', position: "fixed" }}>
            <Toolbar>
                <IconButton color="inherit" onClick={handleHome} disableRipple sx={{ '&:focus': { outline: 'none' } }}>
                    <SvgIcon sx={{ marginRight: '20px', marginLeft: '20px' }}>
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Disney Verse
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Typography style={{ marginRight: '2%' }} variant="body1" noWrap>
                    Bienvenido al universo de Disney
                </Typography>
                <IconButton onClick={handleSettings} color="inherit" disableRipple sx={{ '&:focus': { outline: 'none' } }}>
                    <SettingsIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout} disableRipple sx={{ '&:focus': { outline: 'none' } }}>
                    <Logout />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default SidebarComponent;
