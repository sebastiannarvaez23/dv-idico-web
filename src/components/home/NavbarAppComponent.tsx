import { List, ListItem, ListItemText } from "@mui/material";
import { Fragment } from "react";

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
                        {(text === "products") && <ListItemText primary={"Series / Películas"} />}
                        {(text === "characters") && <ListItemText primary={"Personajes"} />}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}

export default NavbarAppComponent;