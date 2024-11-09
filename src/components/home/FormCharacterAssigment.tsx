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
    action: (characters: { characters: string[] }) => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
}

const FormCharacterAssigment = ({ productSelected, setModalOpen, action }: FormCharacterProps) => {

    useCharacter();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoadingCharacters, characters } = useSelector(
        (state: RootState) => state.character);

    const [leftFinal, setLeftFinal] = useState<ListItem[]>([]);
    const [rightFinal, setRightFinal] = useState<ListItem[]>([]);

    const formik = useFormik<{ characters: string[] }>({
        initialValues: {
            characters: [],
        },
        onSubmit: (values) => handleSubmit(values.characters)
    });

    const handleSubmit = async (characters: string[]) => {
        if (characters.length > 0) dispatch(action({ characters }));
        await setModalOpen(false);
    };

    useEffect(() => {
        formik.setFieldValue('characters', rightFinal.map(item => item.id));
    }, [rightFinal]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Asignar personajes</Typography>
                    <hr />
                    {!isLoadingCharacters &&
                        (<TransferListElementComponent
                            initialLeft={characters.map((e: Character) => mapCharacterToListItem(e, 'P'))}
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
