import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AppDispatch } from "../../store/store";


interface FormGenderProps {
    genderSelected: Gender;
    title: string;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormGenderComponent = ({ setModalOpen, action, title, genderSelected }: FormGenderProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("El código es requerido")
            .max(4, "El nombre no puede tener más de 4 caracteres"),
        name: Yup.string()
            .required("El código es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
    });

    const formik = useFormik<Gender>({
        initialValues: {
            id: genderSelected.id,
            code: genderSelected.code,
            name: genderSelected.name
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (gender: Gender) => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', gender.id);
        formDataToSend.append('code', gender.code);
        formDataToSend.append('name', gender.name);
        dispatch(action(formDataToSend));
        await setModalOpen(false);
    };

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Box p={2}>
                    <div>
                        <Typography variant="h6">{title}</Typography>
                        <hr />
                        <TextField
                            label="Código"
                            name="code"
                            value={formik.values.code}
                            error={formik.touched.name && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
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
                    </div>
                    <Button
                        sx={{ backgroundColor: '#161732' }}
                        style={{ marginTop: "20px" }}
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary">
                        {title}
                    </Button>
                </Box>
            </form>
        </Fragment>
    );
}

export default FormGenderComponent;