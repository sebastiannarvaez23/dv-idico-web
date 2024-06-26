import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Button, Typography, Box, TextField, Input, Rating, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import useGender from "../../hooks/useGender.hook";
import { useFormik } from "formik";

interface FormProductProps {
    productSelected: Product;
    title: string;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormProductComponent = ({ productSelected, title, action, setModalOpen }: FormProductProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { genders } = useGender();

    const formik = useFormik<Product>({
        initialValues: {
            id: productSelected.id,
            title: productSelected.title,
            image: productSelected.image,
            created_date: productSelected.created_date,
            qualification: productSelected.qualification,
            gender: productSelected.gender,
            endpoint: productSelected.endpoint,
            characters: productSelected.characters
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            setSelectedFile(event.currentTarget.files[0]);
        }
    };

    const handleSubmit = async (values: Product) => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', values.id);
        formDataToSend.append('title', values.title);
        formDataToSend.append('created_date', values.created_date);
        formDataToSend.append('qualification', values.qualification);
        formDataToSend.append('gender_id', values.gender.id as string);
        (selectedFile) && formDataToSend.append('image', selectedFile);
        dispatch(action(formDataToSend));
        await setModalOpen(false);
    };

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            formik.setFieldValue('qualification', newValue.toString());
        }
    };

    const handleGenderChange = (event: SelectChangeEvent<string>) => {
        const selectedGender = genders.find(e => e.id === event.target.value) || { id: "", name: "" };
        formik.setFieldValue('gender', selectedGender);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">{title}</Typography>
                    <hr />
                    <Rating
                        name="qualification"
                        value={parseInt(formik.values.qualification)}
                        onChange={(event, newValue) => {
                            handleRatingChange(newValue);
                        }}
                    />
                    <TextField
                        label="Título"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Fecha de estreno"
                        name="created_date"
                        type="date"
                        value={formik.values.created_date}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="gender-label">Género</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender.id"
                            value={formik.values.gender.id as string}
                            onChange={handleGenderChange}
                        >
                            {genders && genders.map((gender, index) => (
                                <MenuItem key={index} value={gender.id as string}>
                                    {gender.name}
                                </MenuItem>
                            )) || (
                                    <MenuItem value={"Cargando..."}>
                                        {"Cargando.."}
                                    </MenuItem>
                                )}
                        </Select>
                    </FormControl>
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        style={{ marginTop: "20px" }}
                    />
                </div>
                <Button
                    sx={{ backgroundColor: '#161732' }}
                    type="submit"
                    size="large"
                    style={{ marginTop: "20px" }}
                    variant="contained"
                    color="primary"
                >
                    {title}
                </Button>
            </Box>
        </form>
    )
}

export default FormProductComponent;

