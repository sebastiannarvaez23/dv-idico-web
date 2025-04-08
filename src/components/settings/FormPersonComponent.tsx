import { Fragment } from "react";

import { Button, Typography, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dayjs } from "dayjs";

import { mapRoleToAutocompleteSelectItem } from "../../utils/mappers/role-select-item.mapper";
import AutoCompleteComponent from "../common/AutoCompleteComponent";
import useRole from "../../hooks/useRole.hook";
import useUser from "../../hooks/useUser.hook";
import { DateComponent } from "../common/DateComponent";


interface FormPersonProps {
    userSelected: User,
    personSelected: PersonForm;
    title: string;
    page: number;
    nickname: string;
    setModalOpen?: (fun: boolean) => void;
    action: (data: Person, pg: number) => void;
}

const FormPersonComponent = ({ page, title, personSelected, userSelected, nickname, setModalOpen, action }: FormPersonProps) => {

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
        birthDate: Yup.string()
            .required("La fecha de nacimiento es requerida"),
        role: Yup.object({ id: Yup.string().required("El rol es requerido") }),
    });

    const formik = useFormik<PersonForm>({
        initialValues: {
            id: personSelected.id,
            firstName: personSelected.firstName,
            lastName: personSelected.lastName,
            email: personSelected.email,
            phone: personSelected.phone,
            birthDate: personSelected.birthDate,
            userId: userSelected.id,
            role: personSelected.role,
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const { isLoadingRoles, handleGetRoles, roles } = useRole();
    const { handleGetUserByNickname } = useUser();

    const handleSubmit = async (personForm: PersonForm) => {
        const user = await handleGetUserByNickname(nickname);
        if (user) personForm.userId = user.id;
        const { role, ...rest } = personForm;
        const person: Person = { roleId: role.id, ...rest };
        action(person, page);
        setModalOpen && await setModalOpen(false);
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
                            margin="normal" />
                        <TextField
                            label="Apellidos"
                            name="lastName"
                            value={formik.values.lastName}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal" />
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal" />
                        <TextField
                            label="Teléfono"
                            name="phone"
                            value={formik.values.phone}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            onChange={formik.handleChange}
                            fullWidth
                            margin="normal" />
                        <DateComponent
                            label={"Fecha de nacimiento"}
                            name={"birthDate"}
                            touched={formik.touched.birthDate}
                            errors={formik.errors.birthDate}
                            value={formik.values.birthDate}
                            handleDateChange={handleDateChange}
                        />
                        <AutoCompleteComponent
                            label={"Rol"}
                            list={roles.map(e => mapRoleToAutocompleteSelectItem(e))}
                            loading={isLoadingRoles}
                            getList={handleGetRoles}
                            touched={Boolean(formik.touched.role)}
                            errors={formik.errors.role?.id}
                            value={mapRoleToAutocompleteSelectItem(formik.values.role)}
                            onSelect={(item) => {
                                const selected = roles.find(k => k.id === item?.value);
                                formik.setFieldValue("role", selected || { id: "", name: "" });
                            }}
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

export default FormPersonComponent;