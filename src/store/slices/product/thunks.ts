import { AppDispatch, RootState } from "../../store";
import { fetchAddCharacterAssignment, fetchCreateProduct, fetchDeleteCharacterAssignment, fetchDeleteProduct, fetchGetProduct, fetchGetProducts, fetchUpdateProduct } from "../../../services/product";
import { setAlert } from '../common';
import { setCount, setEmptyProductSelected, setProductSelected, setProducts, startLoadingProductSelected, startLoadingProducts } from "./productSlice";


export const getProducts = (page: number = 1) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { productSelected } = getState().product;
            dispatch(startLoadingProducts());
            const products = await fetchGetProducts(page);
            await dispatch(setProducts({ products: products.rows }));
            await dispatch(setCount({ count: products.count }));
            if (products.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Productos almacenados' }));
            else if (productSelected?.id === '') dispatch(getProduct(products.rows[0].id));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de productos.' }));
        }
    };
};

export const getProduct = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingProductSelected());
            const product: Product = await fetchGetProduct(id);
            await dispatch(setProductSelected({ product }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el producto.' }));
        }
    };
};

export const createProduct = (product: FormData, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const productCreated: Product = await fetchCreateProduct(product);
            await dispatch(getProducts(page));
            await dispatch(setAlert({ type: 'success', message: `Producto "${productCreated.title}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el producto.' }));
        }
    };
};

export const updateProduct = (product: FormData, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const productUpdated = await fetchUpdateProduct(product);
            await dispatch(setProductSelected({ product: productUpdated }));
            await dispatch(getProducts(page));
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

export const characterAddAssignment = (characters: { characters: string[] }) => {
    return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const { productSelected } = getState().product;
            await fetchAddCharacterAssignment(productSelected.id, characters);
            await dispatch(getProducts());
            await dispatch(setAlert({ type: 'success', message: 'Personajes asignados exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error asignando los personajes al producto.' }));
        }
    };
};

export const characterDeleteAssignment = (characters: { characters: string[] }) => {
    return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const { productSelected } = getState().product;
            await fetchDeleteCharacterAssignment(productSelected.id, characters);
            await dispatch(getProducts());
            await dispatch(setAlert({ type: 'success', message: 'Personajes asignados exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error asignando los personajes al producto.' }));
        }
    };
};