import { AppDispatch, RootState } from "../../store";
import { fetchCreateProduct, fetchDeleteProduct, fetchGetProduct, fetchGetProducts, fetchUpdateProduct } from "../../../services/product";
import { setEmptyProductSelected, setProductSelected, setProducts, startLoadingProductSelected, startLoadingProducts } from "./productSlice";
import { setAlert } from '../common';

export const getProducts = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { productSelected } = getState().product;
            dispatch(startLoadingProducts());
            const products = await fetchGetProducts();
            await dispatch(setProducts({ products }));
            if (!productSelected?.id) await dispatch(getProduct(products[0].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de productos.' }));
        }
    };
};

export const getProduct = (endpoint: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingProductSelected());
            const product: Product = await fetchGetProduct(endpoint);
            await dispatch(setProductSelected({ product }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el producto.' }));
        }
    };
};

export const createProduct = (product: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const productCreated: Product = await fetchCreateProduct(product);
            await dispatch(getProducts());
            await dispatch(setAlert({ type: 'success', message: `Producto ${productCreated.title} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el producto.' }));
        }
    };
};

export const updateProduct = (product: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const productUpdated = await fetchUpdateProduct(product);
            await dispatch(setProductSelected({ product: productUpdated }));
            await dispatch(getProducts());
            await dispatch(setAlert({ type: 'success', message: 'Producto actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el producto.' }));
        }
    };
};

export const deleteProduct = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { productSelected } = getState().product;
            await fetchDeleteProduct(productSelected.id);
            await dispatch(setEmptyProductSelected());
            await dispatch(getProducts());
            await dispatch(setAlert({ type: 'success', message: 'Producto eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el producto.' }));
        }
    };
};