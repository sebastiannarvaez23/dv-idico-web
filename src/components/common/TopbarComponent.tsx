import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Typography, IconButton, SvgIcon } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

import useSession from '../../hooks/useSession.hook';


const TopbarComponent = () => {

    const navigate = useNavigate();
    const { isAuthenticated, nickname, handleLogout } = useSession();

    const handleSettings = () => {
        navigate('/settings/users');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <AppBar sx={{ backgroundColor: '#161732', position: "fixed" }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={handleHome}
                    disableRipple
                    sx={{
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                            transform: 'scale(1.1)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                    <SvgIcon sx={{ marginRight: '20px', marginLeft: '20px' }}>
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Disney Verse
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Typography style={{ marginRight: '2%' }} variant="body1" noWrap>
                    {isAuthenticated && nickname + ','} Bienvenido al universo de Disney
                </Typography>
                {isAuthenticated && (
                    <IconButton
                        onClick={handleSettings}
                        color="inherit"
                        disableRipple
                        sx={{
                            '&:focus': { outline: 'none' },
                            '&:hover': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.3s ease-in-out',
                            },
                        }}>
                        <SettingsIcon />
                    </IconButton>
                )}
                <IconButton
                    color="inherit"
                    onClick={() => (isAuthenticated ? handleLogout(nickname!) : navigate('/auth'))}
                    disableRipple
                    sx={{
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                            transform: 'scale(1.1)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                    {isAuthenticated ? <Logout /> : <Login />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopbarComponent;
