import React, { useState } from "react";

import { Button, Typography, Box, TextField, Input, Rating } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dayjs } from "dayjs";

import { DateComponent } from "../common/DateComponent";
import { mapGenderToAutocompleteSelectItem } from "../../utils/mappers/gender-select-item.mapper";
import { mapKindToAutocompleteSelectItem } from "../../utils/mappers/kind-select-item.mapper";
import AutoCompleteComponent from "../common/AutoCompleteComponent";
import FormCharacterAssigment from "./FormCharacterAssigment";
import ModalComponent from "../common/ModalComponent";
import useGender from "../../hooks/useGender.hook";
import useKind from "../../hooks/useKind.hook";


interface FormProductProps {
    productSelected: Product;
    title: string;
    modalAssigmentCharacter?: boolean;
    page: number;
    handleCloseModalAssigmentCharacter?: () => void;
    handleOpenModalAssigmentCharacter?: () => void;
    setModalOpen: (fun: boolean) => void;
    action: (data: FormData, pg: number) => void;
}

const FormProductComponent = ({ page, productSelected, title, modalAssigmentCharacter, action, setModalOpen, handleCloseModalAssigmentCharacter, handleOpenModalAssigmentCharacter }: FormProductProps) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { genders, isLoadingGenders, handleGetGenders } = useGender();
    const { kinds, isLoadingKinds, handleGetKinds } = useKind();

    const validationSchema = Yup.object({
        qualification: Yup.number()
            .required("La calificación es requerida")
            .min(1, "Debes seleccionar al menos una estrella"),
        title: Yup.string()
            .required("El título es requerido")
            .max(100, "El título no puede tener más de 100 caracteres"),
        createdDate: Yup.date()
            .nullable(),
        gender: Yup.object({ id: Yup.string().required("El género es requerido") }),
        kind: Yup.object({ id: Yup.string().required("El tipo de producto es requerido") }),
    });

    const formik = useFormik<Product>({
        initialValues: {
            id: productSelected.id,
            title: productSelected.title,
            image: productSelected.image,
            createdDate: productSelected.createdDate,
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
        formDataToSend.append('createdDate', values.createdDate);
        formDataToSend.append('qualification', values.qualification);
        formDataToSend.append('genderId', values.gender.id as string);
        formDataToSend.append('kindId', values.kind.id as string);
        (selectedFile) && formDataToSend.append('image', selectedFile);
        action(formDataToSend, page);
        await setModalOpen(false);
    };

    const handleRatingChange = (newValue: number | null) => {
        if (newValue !== null) {
            formik.setFieldValue('qualification', newValue.toString());
        }
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
                        <DateComponent
                            label={"Fecha de creación"}
                            name={"createdDate"}
                            touched={formik.touched.createdDate}
                            errors={formik.errors.createdDate}
                            value={formik.values.createdDate}
                            handleDateChange={handleDateChange}
                        />
                        <AutoCompleteComponent
                            label={"Género"}
                            list={genders.map(e => mapGenderToAutocompleteSelectItem(e))}
                            loading={isLoadingGenders}
                            getList={handleGetGenders}
                            onSelect={(item) => {
                                const selected = genders.find(g => g.id === item?.value);
                                formik.setFieldValue("gender", selected || { id: "", name: "" });
                            }}
                        />
                        <AutoCompleteComponent
                            label={"Tipo de producto"}
                            list={kinds.map(e => mapKindToAutocompleteSelectItem(e))}
                            loading={isLoadingKinds}
                            getList={handleGetKinds}
                            onSelect={(item) => {
                                const selected = kinds.find(k => k.id === item?.value);
                                formik.setFieldValue("kind", selected || { id: "", name: "" });
                            }}
                        />
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
                            onClick={handleOpenModalAssigmentCharacter}>
                            Asignar personajes
                        </Button>)}
                </Box>
            </form >
            {formik.values.id &&
                (<ModalComponent
                    width={40}
                    open={modalAssigmentCharacter!}
                    onClose={handleCloseModalAssigmentCharacter!}>
                    <FormCharacterAssigment
                        setModalOpen={setModalOpen}
                    />
                </ModalComponent>)}
        </div>
    )
}

export default FormProductComponent;