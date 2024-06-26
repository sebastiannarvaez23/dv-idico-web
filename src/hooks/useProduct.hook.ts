import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getProducts } from '../store/slices/product';

function useProduct() {

    const dispatch = useDispatch<AppDispatch>();

    const [modalEditProduct, setModalEditProduct] = useState(false);
    const [modalCreateProduct, setModalCreateProduct] = useState(false);

    const productEmpty: Product = {
        id: "",
        title: "",
        created_date: Date.now().toString(),
        qualification: "",
        endpoint: "",
        gender: { id: "", name: "" },
        image: "",
        characters: []
    }

    const detailLabelsProduct: DetailsLabelCardElement = {
        label1: "Fecha de salida: ",
        label2: "Calificación: ",
        label3: "Género: ",
        label4: "Personajes: "
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

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return {
        productEmpty,
        detailLabelsProduct,
        modalCreateProduct,
        modalEditProduct,
        setModalEditProduct,
        setModalCreateProduct,
        handleOpenModalEditProduct,
        handleCloseModalEditProduct,
        handleOpenModalCreateProduct,
        handleCloseModalCreateProduct,
    };
}

export default useProduct;
