import { AppDispatch, RootState } from "../../store";
import { fetchDeleteProduct, fetchGetProduct, fetchGetProducts, fetchUpdateProduct } from "../../../services/product";
import { setProductSelected, setProducts, startLoadingProductSelected, startLoadingProducts } from "./productSlice";
import { setAlert } from '../common';

export const getProducts = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { productSelected } = getState().product;
            dispatch(startLoadingProducts());
            const seriesMovies = await fetchGetProducts();
            dispatch(setProducts({ seriesMovies }));
            if (!productSelected?.id) dispatch(getProduct(seriesMovies[0].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista Series y Películas' }));
        }

    };
}

export const getProduct = (endpoint: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingProductSelected());
            const product: Product = await fetchGetProduct(endpoint);
            dispatch(setProductSelected({ product }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la Serie/Película' }));
        }

    };
}

export const updateProduct = (product: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const productUpdated = await fetchUpdateProduct(product);
            dispatch(setProductSelected({ product: productUpdated }));
            dispatch(getProducts());
            dispatch(setAlert({ type: 'success', message: 'Serie/Película Actualizada exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando la Serie/Película' }));
        }
    };
}

export const deleteProduct = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { seriesMovies, productSelected } = getState().product;
            await fetchDeleteProduct(productSelected.id);
            dispatch(getProducts());
            dispatch(getProduct(seriesMovies[1].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando la Serie/Película' }));
        }
    }
}