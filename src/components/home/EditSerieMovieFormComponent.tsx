import { Button, Typography, Box, TextField, Input, Rating, FormControl, FormLabel, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const EditSerieMovieFormComponent = () => {

    const [formData, setFormData] = useState({
        title: "Esto es una prueba creando una serie o una pelicula",
        image: null as File | null,
        created_date: "1937-12-21T00:00:00.000Z",
        qualification: 5,
        gender: "",
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

    const handleGenreChange = (e: SelectChangeEvent<string>) => {
        setFormData({
            ...formData,
            gender: e.target.value,
        });
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
                <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-label">Género</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenreChange}
                    >
                        <MenuItem value="Aventura">Aventura</MenuItem>
                        <MenuItem value="Comedia">Comedia</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                        <MenuItem value="Acción">Acción</MenuItem>
                        <MenuItem value="Ciencia Ficción">Ciencia Ficción</MenuItem>
                        {/* Añade más géneros según necesites */}
                    </Select>
                </FormControl>
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

