import { Fragment, useEffect, useState } from "react";

import { Button, Box, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";

import { ContainListRowAssigmentService } from "./ContainListRowAssigmentService";
import { mapServiceAssignedToDetailsCardElement } from "../../utils/mappers/service-assigment.mapper";
import ListCardComponent from "../home/ListCardComponent";
import useRole from '../../hooks/useRole.hook';


interface FormRoleAssigmentServiceProps {
    roleSelected: Role;
    setModalOpen: (fun: boolean) => void;
}

export const FormRoleAssigmentService = ({ roleSelected, setModalOpen }: FormRoleAssigmentServiceProps) => {

    const {
        handleGetServicesAssignedRole,
        handleAssignServiceToRole,
        handleRevokeServiceToRole,
    } = useRole();

    const [toInclude, setToInclude] = useState<string[]>([]);
    const [toExclude, setToExclude] = useState<string[]>([]);
    const [services, setServices] = useState<DetailsCardElement[]>([]);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageAssigment, setPageAssigment] = useState<number>(1);
    const [servicesBackUp, setServicesBackUp] = useState<ServiceAssigment[]>([]);

    const formik = useFormik<{ addServices: string[], deleteServices: string[] }>({
        initialValues: {
            addServices: [],
            deleteServices: [],
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleCheck = (id: string, value: boolean) => {
        const serviceBackUp = servicesBackUp.find(e => e.id === id);
        if (value && !toInclude.includes(id)) {
            if (serviceBackUp?.assigned === false) {
                setToInclude([...toInclude, id]);
            } else {
                const newIds = toExclude.filter((uuid) => uuid !== id);
                setToExclude(newIds);
            }
        }
        if (!value && !toExclude.includes(id)) {
            if (serviceBackUp?.assigned === true) {
                setToExclude([...toExclude, id]);
            } else {
                const newIds = toInclude.filter((uuid) => uuid !== id);
                setToInclude(newIds);
            }
        }

        const se: DetailsCardElement[] = services.map(e => {
            if (e.id === id) e.check1 = value;
            return e;
        })
        setServices(se);
    }

    const getServicesAssignedRole = async (pg: number, roleId: string, filter?: string) => {
        const res = await handleGetServicesAssignedRole(roleId, pg, filter);
        const se = await res.rows.map(e => {
            if (toInclude.includes(e.id)) e.assigned = true;
            return mapServiceAssignedToDetailsCardElement(e);
        }) ?? [];
        setServicesBackUp(res.rows);
        setTotalRows(res.count);
        setServices(se ?? []);
        setPageAssigment(pg);
    }

    const handleSubmit = async (services: { addServices: string[], deleteServices: string[] }) => {
        if (services.addServices.length > 0) handleAssignServiceToRole(roleSelected.id, { services: services.addServices });
        if (services.deleteServices.length > 0) handleRevokeServiceToRole(roleSelected.id, { services: services.deleteServices });
        await setModalOpen(false);
    };

    useEffect(() => {
        getServicesAssignedRole(pageAssigment, roleSelected.id);
    }, []);

    useEffect(() => {
        formik.setFieldValue('addServices', toInclude);
    }, [toInclude]);

    useEffect(() => {
        formik.setFieldValue('deleteServices', toExclude);
    }, [toExclude]);

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
                            label="Nombre servicio"
                            variant="outlined"
                        />
                        <ListCardComponent
                            height={'40vh'}
                            elements={services}
                            totalRows={totalRows}
                            page={pageAssigment}
                            handleCheck={handleCheck}
                            handleGetElements={(pg: number, ft?: string) => getServicesAssignedRole(pg, roleSelected.id, ft)}
                            rowComponent={ContainListRowAssigmentService}
                        />
                    </div>
                    <Button
                        sx={{ backgroundColor: '#161732' }}
                        style={{ marginTop: "20px" }}
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary">
                        Asignar
                    </Button>
                </Box>
            </form>
        </Fragment>
    );
}