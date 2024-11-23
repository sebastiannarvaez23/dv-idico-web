import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

import { Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";

import { AppDispatch, RootState } from "../../store/store";
import { fetchGetCharactersAssignedProduct, fetchGetCharactersNotAssignedProduct } from '../../services/character';
import { mapCharacterToListItem } from "../../utils/mappers/list-item.mapper";
import { uribuild } from '../../utils/params/uribuild';
import TransferListElementComponent from "../common/TransferListElementComponent";
import useCharacter from "../../hooks/useCharacter.hook";


interface FormCharacterProps {
    productSelected: Product;
    setModalOpen: (fun: boolean) => void;
    addAction: (characters: { characters: string[] }) => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
    deleteAction: (characters: { characters: string[] }) => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
}

const FormCharacterAssigment = ({ productSelected, setModalOpen, addAction, deleteAction }: FormCharacterProps) => {

    useCharacter();
    const dispatch = useDispatch<AppDispatch>();

    const [initialLeft, setInitialLeft] = useState<ListItem[]>([]);
    const [initialRight, setInitialRight] = useState<ListItem[]>([]);

    const [leftFinal, setLeftFinal] = useState<ListItem[]>([]);
    const [rightFinal, setRightFinal] = useState<ListItem[]>([]);

    const [leftCount, setLeftCount] = useState<number>(1);
    const [rightCount, setRightCount] = useState<number>(1);

    const [leftCurrentPage, setLeftCurrentPage] = useState(1);
    const [rightCurrentPage, setRightCurrentPage] = useState(1);

    const formik = useFormik<{ addCharacters: string[], deleteCharacters: string[] }>({
        initialValues: {
            addCharacters: [],
            deleteCharacters: [],
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (characters: { addCharacters: string[], deleteCharacters: string[] }) => {
        if (characters.addCharacters.length > 0) dispatch(addAction({ characters: characters.addCharacters }));
        if (characters.deleteCharacters.length > 0) dispatch(deleteAction({ characters: characters.deleteCharacters }));
        await setModalOpen(false);
    };

    const handleGetIncludeCharacters = async () => {
        const include = await fetchGetCharactersAssignedProduct(productSelected.id, uribuild({ page: leftCurrentPage }));
        const exclude = await fetchGetCharactersNotAssignedProduct(productSelected.id, uribuild({ page: 1 }));
        setInitialRight(include.rows.map(e => mapCharacterToListItem(e, 'A')));
        setRightCount(include.count);
        setInitialLeft(exclude.rows.map(e => mapCharacterToListItem(e, 'P')));
        setLeftCount(exclude.count);
    }

    useEffect(() => {
        handleGetIncludeCharacters();
        formik.setFieldValue('addCharacters', rightFinal.map(item => item.id));
        formik.setFieldValue('deleteCharacters', leftFinal.map(item => item.id));
    }, [rightFinal, leftFinal]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const include = await fetchGetCharactersAssignedProduct(productSelected.id, uribuild({ page: leftCurrentPage }));
                setInitialRight(include.rows.map(e => mapCharacterToListItem(e, 'A')));
                setRightCount(include.count);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
    }, [leftCurrentPage]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Asignar personajes</Typography>
                    <hr />
                    {initialLeft.length > 0 &&
                        (<TransferListElementComponent
                            initialLeft={initialLeft}
                            initialRight={initialRight}
                            leftFinal={leftFinal}
                            rightFinal={rightFinal}
                            leftCount={leftCount}
                            rightCount={rightCount}
                            setLeftFinal={setLeftFinal}
                            setRightFinal={setRightFinal}
                            leftPage={leftCurrentPage}
                            rightPage={rightCurrentPage}
                            setLeftCurrentPage={setLeftCurrentPage}
                            setRightCurrentPage={setRightCurrentPage}
                        />)
                        || "cargando..."}
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
