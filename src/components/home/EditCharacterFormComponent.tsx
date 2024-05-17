import { Button, Typography, Box, TextField, Input } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateCharacter } from "../../store/slices/character";

interface EditCharacterFormProps {
    setModalOpen: (fun: boolean) => void;
}

const EditCharacterFormComponent = ({ setModalOpen }: EditCharacterFormProps) => {

    const { characterSelected } = useSelector(
        (state: RootState) => state.character);

    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        id: characterSelected.id,
        name: characterSelected.name,
        image: characterSelected.image,
        age: characterSelected.age,
        weight: characterSelected.weight,
        history: characterSelected.history
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: file,
                })
            }
        }
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', formData.id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('history', formData.history);
        dispatch(updateCharacter(formDataToSend));
        await setModalOpen(false);
    };

    return (
        <Box p={2}>
            <div>
                <Typography variant="h6">Editar Personaje</Typography>
                <hr />
                <TextField
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Edad"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Peso"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Historia"
                    name="history"
                    multiline
                    rows={4}
                    value={formData.history}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Input
                    type="file"
                    onChange={handleImageChange}
                    style={{ marginTop: "20px" }}
                />
            </div>
            <Button
                sx={{ backgroundColor: '#161732' }}
                onClick={handleSubmit}
                size="large"
                style={{ marginTop: "20px" }}
                variant="contained"
                color="primary"
            >
                Editar Personaje
            </Button>
        </Box>
    )
}

export default EditCharacterFormComponent;
