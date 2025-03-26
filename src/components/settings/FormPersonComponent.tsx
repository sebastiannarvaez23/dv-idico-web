import { Fragment } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Typography, Box, TextField, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";


interface FormPersonProps {
    personSelected: Person;
    title: string;
    page: number;
    setModalOpen: (fun: boolean) => void;
    action: (data: Person, pg: number) => void;
}

const FormPersonComponent = ({ page, title, personSelected, setModalOpen, action }: FormPersonProps) => {

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("El nombre es requerido")
            .max(70, "El nombre no puede tener más de 70 caracteres")
            .min(3, "El nombre no puede tener menos de 3 caracteres"),
        lastName: Yup.string()
            .required("El apellido es requerido")
            .max(70, "El apellido no puede tener más de 70 caracteres")
            .min(3, "El apellido no puede tener menos de 3 caracteres"),
        email: Yup.string()
            .required("El email es requerido")
            .max(100, "El email no puede tener más de 100 caracteres"),
        phone: Yup.string()
            .required("El teléfono es requerido")
            .max(10, "El teléfono no puede tener más de 10 caracteres")
            .min(10, "El teléfono no puede tener menos de 10 caracteres"),
    });

    const formik = useFormik<Person>({
        initialValues: {
            id: personSelected.id,
            firstName: personSelected.firstName,
            lastName: personSelected.lastName,
            email: personSelected.email,
            phone: personSelected.phone,
            birthDate: dayjs(personSelected.birthDate).toString(),
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (person: Person) => {
        action(person, page);
        await setModalOpen(false);
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue && newValue.isValid()) {
            formik.setFieldValue("birthDate", newValue.toDate());
        } else {
            formik.setFieldValue("birthDate", null);
        }
    };

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Box p={2}>
                    <div>
                        <Typography variant="h6">{title}</Typography>
                        <hr />
                        <TextField
                            label="Nombres"
                            name="firstName"
                            value={formik.values.firstName}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Apellidos"
                            name="lastName"
                            value={formik.values.lastName}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Teléfono"
                            name="phone"
                            value={formik.values.phone}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                                    <DatePicker
                                        disabled={true}
                                        label="Fecha de nacimiento"
                                        name="birthDate"
                                        value={dayjs(formik.values.birthDate)}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                error: formik.touched.birthDate && Boolean(formik.errors.birthDate),
                                                helperText: formik.touched.birthDate && typeof formik.errors.birthDate === 'string'
                                                    ? formik.errors.birthDate
                                                    : undefined,
                                                fullWidth: true,
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
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

export default FormPersonComponent;