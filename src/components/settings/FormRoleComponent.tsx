import { Fragment } from "react";

import { Button, Typography, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";


interface FormRoleProps {
    roleSelected: Role;
    title: string;
    page: number;
    setModalOpen: (fun: boolean) => void;
    action: (data: Role, pg: number) => void;
}

const FormRoleComponent = ({ page, title, roleSelected, setModalOpen, action }: FormRoleProps) => {

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("El nombre es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
    });

    const formik = useFormik<Role>({
        initialValues: {
            id: roleSelected.id,
            name: roleSelected.name
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (role: Role) => {
        action(role, page);
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

export default FormRoleComponent;