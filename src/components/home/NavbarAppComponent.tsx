import { Fragment } from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material";


interface NavbarAppComponentProps {
    setSectionSelected: (section: TypSection) => void;
}

const NavbarAppComponent = ({ setSectionSelected }: NavbarAppComponentProps) => {

    const sections: TypSection[] = ["products", "characters"];

    return (
        <Fragment>
            <List sx={{ background: "#dbe3e9", position: "fixed", top: 64, left: 0, zIndex: 1000, display: "flex", width: "100%" }}>
                {sections.map((text: TypSection) => (
                    <ListItem button sx={{ textAlign: "center" }} key={text} onClick={() => setSectionSelected(text)}>
                        {(text === "products") && <ListItemText primary={<Typography fontWeight="bold">Series / Películas</Typography>} />}
                        {(text === "characters") && <ListItemText primary={<Typography fontWeight="bold">Personajes</Typography>} />}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}

export default NavbarAppComponent;