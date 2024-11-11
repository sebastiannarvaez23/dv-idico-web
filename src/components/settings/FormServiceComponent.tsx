import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AppDispatch } from "../../store/store";


interface FormServiceProps {
    serviceSelected: Service;
    title: string;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData) => (dispatch: AppDispatch) => Promise<void>;
}

const FormServiceComponent = ({ setModalOpen, action, title, serviceSelected }: FormServiceProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("El código es requerido")
            .max(4, "El código no puede tener más de 4 caracteres"),
        name: Yup.string()
            .required("El nombre es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
    });

    const formik = useFormik<Service>({
        initialValues: {
            id: serviceSelected.id,
            code: serviceSelected.code,
            name: serviceSelected.name
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (service: Service) => {
        const formDataToSend = new FormData();
        formDataToSend.append('id', service.id);
        formDataToSend.append('code', service.code);
        formDataToSend.append('name', service.name);
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

export default FormServiceComponent;