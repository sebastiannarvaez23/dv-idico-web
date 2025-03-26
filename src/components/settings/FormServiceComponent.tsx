import { Fragment } from "react";

import { Button, Typography, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";


interface FormServiceProps {
    serviceSelected: Service;
    title: string;
    page: number;
    setModalOpen: (fun: boolean) => void;
    action: (data: Service, pg: number) => void;
}

const FormServiceComponent = ({ page, title, serviceSelected, setModalOpen, action }: FormServiceProps) => {

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("El código es requerido")
            .max(4, "El código no puede tener más de 4 caracteres")
            .min(4, "El código no puede tener menos de 4 caracteres")
            .matches(/^[0-9]+$/, "El código solo puede contener números"),
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
        action(service, page);
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