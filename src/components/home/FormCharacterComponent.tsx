import { Button, Typography, Box, TextField, Input } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import * as Yup from "yup";

interface FormCharacterProps {
    characterSelected: Character;
    title: string;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormCharacterComponent = ({ setModalOpen, action, title, characterSelected }: FormCharacterProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        age: Yup.number()
            .required("La edad es requerida")
            .min(1, "Debes digitar edades superiores a 1"),
        history: Yup.string().required("La historia es requerida"),
    });

    const formik = useFormik<Character>({
        initialValues: {
            id: characterSelected.id,
            name: characterSelected.name,
            image: characterSelected.image,
            age: characterSelected.age,
            history: characterSelected.history,
            products: characterSelected.products
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (character: Character) => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', character.id);
        formDataToSend.append('name', character.name);
        formDataToSend.append('age', character.age);
        formDataToSend.append('history', character.history);
        (selectedFile) && formDataToSend.append('image', selectedFile);
        dispatch(action(formDataToSend));
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
                    <Typography variant="h6">{title}</Typography>
                    <hr />
                    <TextField
                        label="Nombre"
                        name="name"
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Edad"
                        name="age"
                        type="number"
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Historia"
                        name="history"
                        multiline
                        rows={4}
                        error={formik.touched.history && Boolean(formik.errors.history)}
                        helperText={formik.touched.history && formik.errors.history}
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
                    {title}
                </Button>
            </Box>
        </form>
    )
}

export default FormCharacterComponent;
