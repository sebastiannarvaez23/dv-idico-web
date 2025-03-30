import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { characterAddAssignment, characterDeleteAssignment, createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../store/slices/product';
import { fetchGetCharactersAssignedProduct } from '../services/character';
import { uribuild } from '../utils/params/uribuild';


function useProduct() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        isLoadingProductSelected,
        isLoadingProducts,
        products,
        productSelected,
        count,
        page,
        filter,
    } = useSelector((state: RootState) => state.product);

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

    const handleGetProduct = (id: string) => {
        dispatch(getProduct(id));
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

    const handleAssignCharacterToProduct = (characters: { characters: string[] }) => {
        dispatch(characterAddAssignment(characters));
    }

    const handleRevokeCharacterToProduct = (characters: { characters: string[] }) => {
        dispatch(characterDeleteAssignment(characters));
    }

    const handleCreateProduct = (product: FormData, page: number) => {
        dispatch(createProduct(product, page));
    }
    const handleUpdateProduct = (product: FormData, page: number) => {
        dispatch(updateProduct(product, page));
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProduct());
    }

    const handleGetCharactersAssignedProduct = async (page: number, filter?: string) => {
        return await fetchGetCharactersAssignedProduct(productSelected.id, uribuild({ page, filter }));
    };

    useEffect(() => {
        if (products.length === 0) dispatch(getProducts());
    }, [])

    return {
        count,
        detailLabelsProduct,
        filter,
        isLoadingProducts,
        isLoadingProductSelected,
        modalAssigmentCharacter,
        modalCreateProduct,
        modalEditProduct,
        page,
        productEmpty,
        products,
        productSelected,
        handleDeleteProduct,
        handleCreateProduct,
        handleUpdateProduct,
        handleAssignCharacterToProduct,
        handleRevokeCharacterToProduct,
        handleCloseModalAssigmentCharacter,
        handleCloseModalCreateProduct,
        handleCloseModalEditProduct,
        handleGetProducts,
        handleGetProduct,
        handleOpenModalAssigmentCharacter,
        handleOpenModalCreateProduct,
        handleOpenModalEditProduct,
        setModalAssigmentCharacter,
        setModalCreateProduct,
        setModalEditProduct,
        handleGetCharactersAssignedProduct
    };
}

export default useProduct;
