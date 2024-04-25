import { AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import '../../styles/SidebarComponent.css';

function SidebarComponent() {
    return (
        <div className="root">
            <div className="root">
                <AppBar position="fixed" className="appBar">
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Disney Verse
                        </Typography>
                    </Toolbar>
                    <List className="sidebar">
                        {['Personajes', 'Peliculas', 'API'].map((text) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </AppBar>
            </div>
        </div>
    );
}

export default SidebarComponent;