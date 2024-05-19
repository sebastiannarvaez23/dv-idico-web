import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
    isLoadingProducts: boolean;
    isLoadingProductSelected: boolean;
    error: string | null;
    productSelected: Product;
    seriesMovies: Product[];
}

const initialState: ProductState = {
    isLoadingProducts: false,
    isLoadingProductSelected: false,
    error: null,
    productSelected: {
        id: "",
        title: "",
        image: "",
        created_date: "",
        qualification: "",
        gender: { id: "", name: "" },
        endpoint: "",
        characters: []
    },
    seriesMovies: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startLoadingProducts: (state) => {
            state.isLoadingProducts = true;
        },
        startLoadingProductSelected: (state) => {
            state.isLoadingProductSelected = true;
        },
        setProducts: (state, action) => {
            state.isLoadingProducts = false;
            state.seriesMovies = action.payload.seriesMovies;
        },
        setProductSelected: (state, action) => {
            state.isLoadingProductSelected = false;
            state.productSelected = action.payload.product;
        }
    },
})

export const {
    startLoadingProducts,
    startLoadingProductSelected,
    setProducts,
    setProductSelected
} = productSlice.actions;