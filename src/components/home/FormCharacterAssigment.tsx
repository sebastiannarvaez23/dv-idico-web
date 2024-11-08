import { Button, Typography, Box, TextField, Input } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import * as Yup from "yup";
import TransferListElementComponent from "../elements/TransferListElementComponent";

interface FormCharacterProps {
    productSelected: Product;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormCharacterAssigment = ({ setModalOpen, action, productSelected }: FormCharacterProps) => {

    const dispatch = useDispatch<AppDispatch>();

    // LISTA IZQUIERDA ORIGINAL
    // LISTA DERECHA ORIGINAL
    // LISTA COMPARACION IZQUIERDA ORIGINAL
    // LISTA COMPARACION DERECHA ORIGINAL


    const formik = useFormik<{ characters: string[] }>({
        initialValues: {
            characters: [],
        },
        onSubmit: (values) => handleSubmit(values.characters)
    });

    const handleSubmit = async (characters: string[]) => {
        const formDataToSend = new FormData();
        //formDataToSend.append('characters', characters);
        //dispatch(action(formDataToSend));
        await setModalOpen(false);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Asignar personajes</Typography>
                    <hr />
                    <TransferListElementComponent />
                </div>
                <Button
                    sx={{ backgroundColor: '#161732' }}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                >Asignar
                </Button>
            </Box>
        </form>
    )
}

export default FormCharacterAssigment;
