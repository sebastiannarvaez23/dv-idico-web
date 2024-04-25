import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../../styles/SidebarComponent.css';

interface PropsComponent {
    setSectionSelected: (section: string) => void;
}

function SidebarComponent({ setSectionSelected }: PropsComponent) {
    const name = "Sebastian";
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div className="root">
            <AppBar position="fixed" className="appBar">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Disney Verse
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography style={{ marginRight: '2%' }} variant="body1" noWrap>
                        Bienvenido al universo {name}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                </Toolbar>
                <List className="sidebar">
                    {['Personajes', 'Peliculas', 'API'].map((text) => (
                        <ListItem button key={text} onClick={() => setSectionSelected(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </AppBar>
        </div>
    );
}

export default SidebarComponent;
