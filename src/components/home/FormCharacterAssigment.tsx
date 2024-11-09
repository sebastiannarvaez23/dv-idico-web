import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { Button, Typography, Box } from "@mui/material";
import { mapCharacterToListItem } from "../../utils/mappers/list-item.mapper";
import { useFormik } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import TransferListElementComponent from "../elements/TransferListElementComponent";
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
    const { isLoadingCharacters, characters } = useSelector(
        (state: RootState) => state.character);

    const [leftFinal, setLeftFinal] = useState<ListItem[]>([]);
    const [rightFinal, setRightFinal] = useState<ListItem[]>([]);

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

    useEffect(() => {
        formik.setFieldValue('addCharacters', rightFinal.map(item => item.id));
        formik.setFieldValue('deleteCharacters', leftFinal.map(item => item.id));
    }, [rightFinal, leftFinal]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Asignar personajes</Typography>
                    <hr />
                    {!isLoadingCharacters &&
                        (<TransferListElementComponent
                            initialLeft={characters
                                .filter((e: Character) => !productSelected.characters.some(pc => pc.id === e.id))
                                .map((e: Character) => mapCharacterToListItem(e, 'P'))}
                            initialRight={productSelected.characters.map(e => mapCharacterToListItem(e, 'A'))}
                            leftFinal={leftFinal}
                            rightFinal={rightFinal}
                            setLeftFinal={setLeftFinal}
                            setRightFinal={setRightFinal}
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
