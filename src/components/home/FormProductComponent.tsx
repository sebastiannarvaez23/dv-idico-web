import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Button, Typography, Box, TextField, Input, Rating, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import useGender from "../../hooks/useGender.hook";
import { useFormik } from "formik";
import useKind from "../../hooks/useKind.hook";

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
    const { kinds } = useKind();

    const formik = useFormik<Product>({
        initialValues: {
            id: productSelected.id,
            title: productSelected.title,
            image: productSelected.image,
            createdDate: productSelected.createdDate,
            qualification: productSelected.qualification,
            gender: productSelected.gender,
            kind: productSelected.kind,
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
        formDataToSend.append('createdDate', values.createdDate);
        formDataToSend.append('qualification', values.qualification);
        formDataToSend.append('genderId', values.gender.id as string);
        formDataToSend.append('kindId', values.kind.id as string);
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

    const handleKindChange = (event: SelectChangeEvent<string>) => {
        const selectedKind = kinds.find(e => e.id === event.target.value) || { id: "", name: "" };
        formik.setFieldValue('gender', selectedKind);
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
                        name="createdDate"
                        type="date"
                        value={formik.values.createdDate}
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="kind-label">Tipo de Producto</InputLabel>
                        <Select
                            labelId="kind-label"
                            id="kind"
                            name="kind.id"
                            value={formik.values.kind.id as string}
                            onChange={handleKindChange}
                        >
                            {kinds && kinds.map((kind, index) => (
                                <MenuItem key={index} value={kind.id as string}>
                                    {kind.name}
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

