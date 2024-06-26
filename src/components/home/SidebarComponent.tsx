import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../../styles/sidebar-component.css';

interface SidebarComponentProps {
    setSectionSelected: (section: TypSection) => void;
}

const SidebarComponent = ({ setSectionSelected }: SidebarComponentProps) => {

    const navigate = useNavigate();
    const sections: TypSection[] = ["products", "characters"];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div className="root">
            <AppBar sx={{ backgroundColor: '#161732' }} position="fixed" className="appBar">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Disney Verse
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography style={{ marginRight: '2%' }} variant="body1" noWrap>
                        Bienvenido al universo de Disney
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                </Toolbar>
                <List className="sidebar">
                    {sections.map((text: TypSection) => (
                        <ListItem button key={text} onClick={() => setSectionSelected(text)}>
                            {(text === "products") && <ListItemText primary={"Series / Películas"} />}
                            {(text === "characters") && <ListItemText primary={"Personajes"} />}
                        </ListItem>
                    ))}
                </List>
            </AppBar>
        </div>
    );
}

export default SidebarComponent;
