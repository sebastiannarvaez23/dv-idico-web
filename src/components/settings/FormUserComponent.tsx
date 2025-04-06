import { Fragment } from "react";

import { Button, Typography, Box, TextField, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";


type FormUser = User & { confirmPassword: string };

interface FormUserProps {
    userSelected: User;
    title: string;
    page: number;
    setUser: (user: User) => void;
    setModalOpen?: (fun: boolean) => void;
    action: (data: User, pg: number) => void;
}

const FormUserComponent = ({ page, title, userSelected, setUser, setModalOpen, action }: FormUserProps) => {

    const validationSchema = Yup.object({
        nickname: Yup.string()
            .required("El nombre de usuario es requerido")
            .max(70, "El nombre de usuario no puede tener más de 70 caracteres")
            .min(5, "El nombre de usuario no puede tener menos de 5 caracteres"),
        password: Yup.string()
            .required("La contraseña es requerida"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Debe repetir la contraseña"),
    });

    const initialValues: FormUser = {
        id: userSelected.id,
        nickname: userSelected.nickname,
        password: userSelected.password,
        confirmPassword: userSelected.password,
        active: userSelected.active,
    };

    const formik = useFormik<FormUser>({
        initialValues,
        validationSchema,
        onSubmit: (values) => handleSubmit(values),
    });

    const handleSubmit = async (values: FormUser) => {
        const { confirmPassword, ...user } = values;
        await action(user, page);
        await setUser({ ...user });
        setModalOpen && await setModalOpen(false);
    };

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Box p={2}>
                    <div>
                        <Typography variant="h6">{title}</Typography>
                        <hr />
                        <TextField
                            label="Nombre de usuario"
                            name="nickname"
                            value={formik.values.nickname}
                            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                            helperText={formik.touched.nickname && formik.errors.nickname}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Repetir contraseña"
                            name="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.active}
                                    onChange={(e) => formik.setFieldValue("active", e.target.checked)}
                                />
                            }
                            label="Activo"
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
};

export default FormUserComponent;
