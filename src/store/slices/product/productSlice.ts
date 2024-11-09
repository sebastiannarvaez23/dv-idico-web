import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
    isLoadingProducts: boolean;
    isLoadingProductSelected: boolean;
    error: string | null;
    productSelected: Product;
    products: Product[];
}

const initialState: ProductState = {
    isLoadingProducts: false,
    isLoadingProductSelected: false,
    error: null,
    productSelected: {
        id: "",
        title: "",
        image: "",
        createdDate: new Date,
        qualification: "",
        gender: { id: "", name: "" },
        kind: { id: "", name: "" },
        characters: []
    },
    products: [],
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
            state.products = action.payload.products;
        },
        setProductSelected: (state, action) => {
            state.isLoadingProductSelected = false;
            state.productSelected = action.payload.product;
        },
        setEmptyProductSelected: (state) => {
            state.productSelected = initialState.productSelected;
        }
    },
})

export const {
    startLoadingProducts,
    startLoadingProductSelected,
    setProducts,
    setProductSelected,
    setEmptyProductSelected
} = productSlice.actions;