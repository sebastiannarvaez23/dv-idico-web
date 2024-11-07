import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton, SvgIcon } from '@mui/material';
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

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="root">
            <AppBar sx={{ backgroundColor: '#161732' }} position="fixed" className="appBar">
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
                    <IconButton color="inherit" disableRipple sx={{ '&:focus': { outline: 'none' } }}>
                        <SvgIcon
                            sx={{ marginRight: '12px', fontSize: 28 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                />
                            </svg>
                        </SvgIcon>
                    </IconButton>
                    <IconButton color="inherit" onClick={handleLogout} disableRipple sx={{ '&:focus': { outline: 'none' } }}>
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
