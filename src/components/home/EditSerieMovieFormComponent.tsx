import { Button, Typography, Box, TextField, Input, Rating, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { getGenders } from "../../services/gender";
import { updateSerieMovie } from "../../services/serie-movie";

interface EditSerieMovieFormProps {
    serieMovie: SerieMovie
}

const EditSerieMovieFormComponent = ({ serieMovie }: EditSerieMovieFormProps) => {

    const [genders, setGenders] = useState<Gender[]>([]);

    const [formData, setFormData] = useState<SerieMovie>({
        id: serieMovie.id,
        title: serieMovie.title,
        image: serieMovie.image,
        created_date: serieMovie.created_date,
        qualification: serieMovie.qualification,
        gender: serieMovie.gender,
        characters: serieMovie.characters
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
                });
            };
        }
    };

    const handleSubmit = () => {
        const formDataToSend = new FormData();
        console.log(formData);
        formDataToSend.append('id', formData.id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('created_date', formData.created_date);
        formDataToSend.append('qualification', formData.qualification);
        formDataToSend.append('gender_id', formData.gender.id);
        formDataToSend.append('image', formData.image);

        updateSerieMovie(formDataToSend);
    };

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            setFormData({
                ...formData,
                qualification: newValue.toString(),
            });
        }
    };

    const handleGenreChange = (event: SelectChangeEvent<string>) => {
        console.log("valor del select", event.target.value);
        let selectGender = genders.find(e => e.id === event.target.value);
        if (!selectGender) selectGender = { id: "", name: "" }
        setFormData({
            ...formData,
            gender: selectGender,
        });
    };

    const fetchGenders = async () => {
        try {
            const genders: Gender[] = await getGenders();
            setGenders(genders);
        } catch (error) {
            throw new Error(`Error al obtener listado de generos: ${error}`);
        }
    }

    useEffect(() => {
        fetchGenders();
    }, []);

    return (
        <Box p={2}>
            <div>
                <Typography variant="h6">Editar Serie / Película</Typography>
                <hr />
                <Rating
                    name="qualification"
                    value={parseInt(formData.qualification)}
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
                        value={formData.gender.id}
                        onChange={handleGenreChange}
                    >
                        {genders.map((gender, index) => (
                            <MenuItem key={index} value={gender.id}>
                                {gender.name}
                            </MenuItem>
                        ))}
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

