import { Button, Typography, Box, TextField, Input } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateCharacter } from "../../store/slices/character";
import { useState } from "react";

interface EditCharacterFormProps {
    setModalOpen: (fun: boolean) => void;
}

const EditCharacterFormComponent = ({ setModalOpen }: EditCharacterFormProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const { characterSelected } = useSelector((state: RootState) => state.character);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const formik = useFormik<Character>({
        initialValues: {
            id: characterSelected.id,
            name: characterSelected.name,
            image: characterSelected.image,
            age: characterSelected.age,
            weight: characterSelected.weight,
            history: characterSelected.history,
            endpoint: characterSelected.endpoint,
            products: characterSelected.products
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (values: Character) => {
        console.log(values);
        const formDataToSend = new FormData();
        formDataToSend.append('id', values.id);
        formDataToSend.append('name', values.name);
        formDataToSend.append('age', values.age);
        formDataToSend.append('weight', values.weight);
        formDataToSend.append('history', values.history);
        (selectedFile) && formDataToSend.append('image', selectedFile);
        dispatch(updateCharacter(formDataToSend));
        await setModalOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            setSelectedFile(event.currentTarget.files[0]);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Editar Personaje</Typography>
                    <hr />
                    <TextField
                        label="Nombre"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Edad"
                        name="age"
                        type="number"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Peso"
                        name="weight"
                        type="number"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Historia"
                        name="history"
                        multiline
                        rows={4}
                        value={formik.values.history}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        style={{ marginTop: "20px" }}
                    />
                </div>
                <Button
                    sx={{ backgroundColor: '#161732' }}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    Editar Personaje
                </Button>
            </Box>
        </form>
    )
}

export default EditCharacterFormComponent;
