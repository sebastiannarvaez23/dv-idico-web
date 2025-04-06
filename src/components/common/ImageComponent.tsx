import { Fragment } from "react";

import { CardMedia } from "@mui/material";

import imageDefault from "./../../../assets/app/images/default.png";


interface ImageComponentProps {
    image: string | undefined;
    alt: string | undefined;
}

export const ImageComponent = ({ image, alt }: ImageComponentProps) => {
    return (
        <Fragment>
            <CardMedia
                image={image || imageDefault}
                alt={`Imagen de ${alt}`}
                component="img"
                style={{
                    width: '100%',
                    height: '340px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)'
                }} />
        </Fragment>
    );
}