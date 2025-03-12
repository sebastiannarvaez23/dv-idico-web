import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { getProducts } from '../store/slices/product';


function useProduct() {

    const dispatch = useDispatch<AppDispatch>();

    const [modalEditProduct, setModalEditProduct] = useState(false);
    const [modalCreateProduct, setModalCreateProduct] = useState(false);
    const [modalAssigmentCharacter, setModalAssigmentCharacter] = useState(false);

    const productEmpty: Product = {
        id: "",
        title: "",
        createdDate: new Date,
        qualification: "",
        gender: { id: "", name: "" },
        kind: { id: "", name: "" },
        image: "",
        characters: []
    }

    const detailLabelsProduct: DetailsLabelCardElement = {
        label1: "Fecha de salida: ",
        label2: "Calificación: ",
        label3: "Género: ",
        label4: "Personajes: "
    }

    const handleGetProducts = (page: number, title?: string) => {
        dispatch(getProducts(page, title));
    }

    const handleOpenModalEditProduct = () => {
        setModalEditProduct(true);
    };

    const handleCloseModalEditProduct = () => {
        setModalEditProduct(false);
    };

    const handleOpenModalCreateProduct = () => {
        setModalCreateProduct(true);
    };

    const handleCloseModalCreateProduct = () => {
        setModalCreateProduct(false);
    };

    const handleOpenModalAssigmentCharacter = () => {
        setModalAssigmentCharacter(true);
    }

    const handleCloseModalAssigmentCharacter = () => {
        setModalAssigmentCharacter(false);
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return {
        productEmpty,
        detailLabelsProduct,
        modalAssigmentCharacter,
        modalCreateProduct,
        modalEditProduct,
        handleGetProducts,
        handleOpenModalAssigmentCharacter,
        setModalAssigmentCharacter,
        setModalEditProduct,
        setModalCreateProduct,
        handleCloseModalAssigmentCharacter,
        handleOpenModalEditProduct,
        handleCloseModalEditProduct,
        handleOpenModalCreateProduct,
        handleCloseModalCreateProduct,
    };
}

export default useProduct;
