import { Fragment } from "react/jsx-runtime";

import { Button, Box, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";

import useRole from '../../hooks/useRole.hook';


interface FormRoleAssigmentServiceProps {
    rolesId: string[];
    setModalOpen: (fun: boolean) => void;
}

export const FormRoleAssigmentService = ({ rolesId, setModalOpen }: FormRoleAssigmentServiceProps) => {

    const { handleAssignServiceToProduct, handleRevokeServiceToProduct } = useRole();

    const formik = useFormik<{ addServices: string[], deleteServices: string[] }>({
        initialValues: {
            addServices: [],
            deleteServices: [],
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (services: { addServices: string[], deleteServices: string[] }) => {
        rolesId.map(id => {
            if (services.addServices.length > 0) handleAssignServiceToProduct(id, { services: services.addServices });
            if (services.deleteServices.length > 0) handleRevokeServiceToProduct(id, { services: services.deleteServices });
        })
        await setModalOpen(false);
    };

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Box p={2}>
                    <div>
                        <Typography variant="h6">Asignar servicios</Typography>
                        <hr />
                        <TextField
                            fullWidth
                            id="outlined-suffix-shrink"
                            label="Nombre personaje"
                            variant="outlined"
                        />
                    </div>
                    <Button
                        sx={{ backgroundColor: '#161732' }}
                        style={{ marginTop: "20px" }}
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                    >Asignar
                    </Button>
                </Box>
            </form>
        </Fragment>
    );
}