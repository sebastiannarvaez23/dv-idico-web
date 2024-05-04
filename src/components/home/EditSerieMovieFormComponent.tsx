import { Button, Typography, Box, TextField, Input, Rating, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";

const EditSerieMovieFormComponent = () => {

    const [formData, setFormData] = useState({
        title: "Esto es una prueba creando una serie o una pelicula",
        image: null as File | null,
        created_date: "1937-12-21T00:00:00.000Z",
        qualification: 5,
        gender: 3,
        deleted: false
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
        console.log(formData);
    };

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            setFormData({
                ...formData,
                qualification: newValue,
            });
        }
    };

    return (
        <Box p={2}>
            <div>
                <Typography variant="h6">Editar Serie / Película</Typography>
                <hr />
                <Rating
                    name="qualification"
                    value={formData.qualification}
                    onChange={(event, newValue) => {
                        handleRatingChange(newValue);
                    }}
                />
                <TextField
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Fecha de estreno"
                    name="created_date"
                    type="date"
                    value={formData.created_date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Genero"
                    name="gender"
                    rows={4}
                    value={formData.gender}
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
                Editar Serie / Película
            </Button>
        </Box>
    )
}

export default EditSerieMovieFormComponent;

