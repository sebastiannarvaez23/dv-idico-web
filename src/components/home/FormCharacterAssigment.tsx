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

const list1: ListItem[] = [
    {
        id: '4f851d66-0d95-4de9-b1f7-ec6fdfa2fdf6',
        status: 'A',
        value: 'mickey mouse'
    },
    {
        id: '0f0edb81-1855-4f49-845c-a35ddaf4204f',
        status: 'A',
        value: 'mini mouse'
    },
    {
        id: 'f06220a3-f854-4762-add8-ab4927919f82',
        status: 'A',
        value: 'pluto'
    },
];
const list2: ListItem[] = [
    {
        id: '62832b04-98bd-4b73-94e9-3008caaa2e3a',
        status: 'P',
        value: 'goofy'
    },
    {
        id: '992920ac-fcbd-47ea-8a49-60dffc655a3c',
        status: 'P',
        value: 'donald duck'
    },
    {
        id: 'e529088b-c564-4c2c-86b1-f10c827d60c6',
        status: 'P',
        value: 'pete'
    },
];

const FormCharacterAssigment = ({ setModalOpen, action, productSelected }: FormCharacterProps) => {

    const dispatch = useDispatch<AppDispatch>();

    // LISTA IZQUIERDA ORIGINAL
    // LISTA DERECHA ORIGINAL
    // LISTA COMPARACION IZQUIERDA ORIGINAL
    // LISTA COMPARACION DERECHA ORIGINAL

    const [left, setLeft] = useState<ListItem[]>(list1);
    const [right, setRight] = useState<ListItem[]>(list2);

    const [leftFinal, setLeftFinal] = useState<ListItem[]>(list1);
    const [rightFinal, setRightFinal] = useState<ListItem[]>(list1);


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
                    <TransferListElementComponent
                        left={left}
                        right={right}
                        leftFinal={leftFinal}
                        rightFinal={rightFinal}
                        setLeft={setLeft}
                        setRight={setRight}
                        setLeftFinal={setLeftFinal}
                        setRightFinal={setRightFinal}
                    />
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
