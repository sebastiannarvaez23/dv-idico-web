import { createSlice } from '@reduxjs/toolkit';


export interface ProductState {
    isLoadingProducts: boolean;
    isLoadingProductSelected: boolean;
    error: string | null;
    productSelected: Product;
    page: number;
    filter: string | undefined;
    count: number;
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
        createdDate: "",
        qualification: "",
        gender: { id: "", name: "" },
        kind: { id: "", name: "" },
        characters: []
    },
    page: 1,
    filter: undefined,
    count: 0,
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
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
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
    setCount,
    setProductSelected,
    setEmptyProductSelected,
    setPage,
    setFilter
} = productSlice.actions;