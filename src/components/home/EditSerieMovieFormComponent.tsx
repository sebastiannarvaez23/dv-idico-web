import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateSerieMovie } from "../../store/slices/seriemovie";
import { Button, Typography, Box, TextField, Input, Rating, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import useApiGender from "../../hooks/useFetchingGender.hook";

interface EditSerieMovieFormProps {
    serieMovie: SerieMovie,
    setModalOpen: (fun: boolean) => void;
}

const EditSerieMovieFormComponent = ({ serieMovie, setModalOpen }: EditSerieMovieFormProps) => {

    const { genders, isLoading } = useApiGender();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
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

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', formData.id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('created_date', formData.created_date);
        formDataToSend.append('qualification', formData.qualification);
        formDataToSend.append('gender_id', formData.gender.id as string);
        formDataToSend.append('image', formData.image);
        dispatch(updateSerieMovie(formDataToSend));
        await setModalOpen(false);
    };

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            setFormData({
                ...formData,
                qualification: newValue.toString(),
            });
        }
    };

    const handleGenderChange = (event: SelectChangeEvent<string>) => {
        let selectGender = genders.find(e => e.id === event.target.value);
        if (!selectGender) selectGender = { id: "", name: "" }
        setFormData({
            ...formData,
            gender: selectGender,
        });
    };

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
                        value={formData.gender.id as string}
                        onChange={handleGenderChange}
                    >
                        {genders && genders.map((gender, index) => (
                            <MenuItem key={index} value={gender.id as string}>
                                {gender.name}
                            </MenuItem>
                        ))}
                        {isLoading && (
                            <MenuItem value={"Cargando..."}>
                                {"Cargando.."}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
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
                Editar Serie / Película
            </Button>
        </Box>
    )
}

export default EditSerieMovieFormComponent;

