import { Button } from "@mui/material";
import { Fragment } from "react";


interface ButtonComponentProps {
    authorization: boolean;
    label: string;
    margin: string;
    size: "small" | "large" | "medium";
    onClick: () => void;
}

export const ButtonComponent = ({ authorization, label, margin, size, onClick }: ButtonComponentProps) => {
    return (
        <Fragment>
            <Button
                disabled={!authorization}
                onClick={onClick}
                sx={{ backgroundColor: "#161732" }}
                style={{ margin: margin }}
                variant="contained"
                size={size}
                color="primary">
                {label}
            </Button>
        </Fragment>
    );
}