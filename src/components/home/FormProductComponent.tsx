import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Button, Typography, Box, TextField, Input, Rating, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import useGender from "../../hooks/useGender.hook";
import { useFormik } from "formik";
import useKind from "../../hooks/useKind.hook";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ModalComponent from "../common/ModalComponent";
import FormCharacterAssigment from "./FormCharacterAssigment";
import { characterAddAssignment, characterDeleteAssignment } from "../../store/slices/product";

interface FormProductProps {
    productSelected: Product;
    title: string;
    modalAssigmentCharacter?: boolean;
    handleCloseModalAssigmentCharacter?: () => void;
    handleOpenModalAssigmentCharacter?: () => void;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormProductComponent = ({ productSelected, title, action, setModalOpen, modalAssigmentCharacter, handleCloseModalAssigmentCharacter, handleOpenModalAssigmentCharacter }: FormProductProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { genders } = useGender();
    const { kinds } = useKind();

    const validationSchema = Yup.object({
        qualification: Yup.number()
            .required("La calificación es requerida")
            .min(1, "Debes seleccionar al menos una estrella"),
        title: Yup.string().required("El título es requerido"),
        createdDate: Yup.date()
            .nullable()
            .typeError("La fecha de estreno debe ser una fecha válida")
            .required("La fecha de estreno es requerida"),
        gender: Yup.object({ id: Yup.string().required("El género es requerido") }),
        kind: Yup.object({ id: Yup.string().required("El tipo de producto es requerido") }),
    });

    const formik = useFormik<Product>({
        initialValues: {
            id: productSelected.id,
            title: productSelected.title,
            image: productSelected.image,
            createdDate: productSelected.createdDate ? dayjs(productSelected.createdDate).toDate() : new Date(),
            qualification: productSelected.qualification,
            gender: productSelected.gender,
            kind: productSelected.kind,
            characters: productSelected.characters
        },
        validationSchema,
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
        formDataToSend.append('createdDate', dayjs(values.createdDate).toISOString());
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
        formik.setFieldValue('kind', selectedKind);
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue && newValue.isValid()) {
            formik.setFieldValue("createdDate", newValue.toDate());
        } else {
            formik.setFieldValue("createdDate", null);
        }
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box p={2}>
                    <div>
                        <Typography variant="h5">{title}</Typography>
                        <hr />
                        <Rating
                            name="qualification"
                            value={parseInt(formik.values.qualification)}
                            onChange={(event, newValue) => {
                                handleRatingChange(newValue);
                            }}
                        />
                        <div>
                            {formik.touched.qualification && formik.errors.qualification && (
                                <Typography variant="caption" color="error">
                                    {formik.errors.qualification}
                                </Typography>
                            )}
                        </div>
                        <TextField
                            label="Título"
                            name="title"
                            value={formik.values.title}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.createdDate && Boolean(formik.errors.createdDate)}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                                    <DatePicker
                                        label="Fecha de estreno"
                                        name="createdDate"
                                        value={dayjs(formik.values.createdDate)}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                error: formik.touched.createdDate && Boolean(formik.errors.createdDate),
                                                helperText: formik.touched.createdDate && typeof formik.errors.createdDate === 'string'
                                                    ? formik.errors.createdDate
                                                    : undefined,
                                                fullWidth: true,
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.gender && Boolean(formik.errors.gender?.id)}
                        >
                            <InputLabel id="gender-label">Género</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                name="gender.id"
                                label="Género"
                                value={formik.values.gender.id as string}
                                onChange={handleGenderChange}
                            >
                                {genders && genders.map((gender, index) => (
                                    <MenuItem key={index} value={gender.id as string}>
                                        {gender.name}
                                    </MenuItem>
                                )) || (
                                        <MenuItem value={"Cargando..."}>
                                            {"Cargando..."}
                                        </MenuItem>
                                    )}
                            </Select>
                            {formik.touched.gender && formik.errors.gender?.id && (
                                <Typography variant="caption" color="error" sx={{ textAlign: 'left', display: 'block', mt: 0.5, ml: 2 }}>
                                    {formik.errors.gender.id}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.kind && Boolean(formik.errors.kind?.id)}>
                            <InputLabel id="kind-label">Tipo de Producto</InputLabel>
                            <Select
                                labelId="kind-label"
                                id="kind"
                                name="kind.id"
                                label="Tipo de Producto"
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
                            {formik.touched.kind && formik.errors.kind?.id && (
                                <Typography variant="caption" color="error" sx={{ textAlign: 'left', display: 'block', mt: 0.5, ml: 2 }}>
                                    {formik.errors.kind.id}
                                </Typography>
                            )}
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
                    >{title}
                    </Button>
                    {formik.values.id &&
                        (<Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            style={{ marginTop: "20px", marginLeft: "12px", color: "#161732", borderColor: "#161732" }}
                            onClick={handleOpenModalAssigmentCharacter}
                        >Asignar personajes</Button>)
                    }
                </Box>
            </form >
            {formik.values.id &&
                (<ModalComponent
                    width={40}
                    open={modalAssigmentCharacter!}
                    onClose={handleCloseModalAssigmentCharacter!}>
                    <FormCharacterAssigment
                        setModalOpen={setModalOpen}
                        addAction={characterAddAssignment}
                        deleteAction={characterDeleteAssignment}
                        productSelected={productSelected}
                    />
                </ModalComponent>)}
        </div>
    )
}

export default FormProductComponent;