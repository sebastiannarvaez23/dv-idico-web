import { Fragment } from "react";

import { CardMedia } from "@mui/material";

import imageDefault from "./../../../assets/app/images/default.png";


interface ImageRowComponentProps {
    image: string | undefined;
    alt: string | undefined;
}

export const ImageRowComponent = ({ image, alt }: ImageRowComponentProps) => {
    return (
        <Fragment>
            <CardMedia
                image={image || imageDefault}
                alt={`Imagen de ${alt}`}
                component="img"
                style={{
                    width: '40px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)'
                }} />
        </Fragment>
    );
}