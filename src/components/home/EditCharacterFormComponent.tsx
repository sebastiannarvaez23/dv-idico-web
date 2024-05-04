import { Button, Typography, Box, TextField, Input } from "@mui/material";
import { useState } from "react";

const EditCharacterFormComponent = () => {

    const [formData, setFormData] = useState({
        image: null as File | null,
        name: "Registro de prueba",
        age: 90,
        weight: 10.2,
        history: "Este es un registro de prueba de edición",
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
            setFormData({
                ...formData,
                image: file,
            });
        }
    };

    const handleSubmit = () => {
        // Aquí puedes enviar los datos del formulario
        console.log(formData);
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
