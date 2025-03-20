import { Button } from "@mui/material";
import { Fragment } from "react";


interface ButtonComponentProps {
    isAuthenticated: boolean;
    isAuthorized: boolean;
    label: string;
    margin: string;
    size: "small" | "large" | "medium";
    onClick: () => void;
}

export const ButtonComponent = ({ isAuthenticated, isAuthorized, label, margin, size, onClick }: ButtonComponentProps) => {
    return (
        <Fragment>
            {isAuthenticated && <Button
                disabled={!isAuthorized}
                onClick={onClick}
                sx={{ backgroundColor: "#161732" }}
                style={{ margin: margin }}
                variant="contained"
                size={size}
                color="primary">
                {label}
            </Button>}
        </Fragment>
    );
}