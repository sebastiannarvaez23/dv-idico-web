import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { createProduct, deleteProduct, updateProduct } from '../store/slices/product';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import { RootState } from '../store/store';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormProductComponent from '../components/home/FormProductComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useProduct from '../hooks/useProduct.hook';


const ProductPage = () => {

    const SECTION: TypSection = "products";

    const { productSelected } = useSelector(
        (state: RootState) => state.product);

    const [productsFilters, setProductsFilters] = useState<Product[]>();

    const productDto: DetailsCardElement = mapProductToDetailsCardElement(productSelected);

    const {
        productEmpty,
        detailLabelsProduct,
        modalCreateProduct,
        modalEditProduct,
        modalAssigmentCharacter,
        handleOpenModalAssigmentCharacter,
        handleCloseModalAssigmentCharacter,
        setModalEditProduct,
        setModalCreateProduct,
        handleOpenModalEditProduct,
        handleCloseModalEditProduct,
        handleOpenModalCreateProduct,
        handleCloseModalCreateProduct
    } = useProduct();

    return (
        <Fragment>
            <ModalComponent
                width={50}
                open={modalCreateProduct}
                onClose={handleCloseModalCreateProduct}>
                <FormProductComponent
                    title="Agregar Producto"
                    setModalOpen={setModalCreateProduct}
                    productSelected={productEmpty}
                    action={createProduct} />
            </ModalComponent>
            <ModalComponent
                width={50}
                open={modalEditProduct}
                onClose={handleCloseModalEditProduct}>
                <FormProductComponent
                    title="Editar Producto"
                    setModalOpen={setModalEditProduct}
                    productSelected={productSelected}
                    action={updateProduct}
                    modalAssigmentCharacter={modalAssigmentCharacter}
                    handleCloseModalAssigmentCharacter={handleCloseModalAssigmentCharacter}
                    handleOpenModalAssigmentCharacter={handleOpenModalAssigmentCharacter}
                />
            </ModalComponent>
            <SearchElementComponent
                setFilteredProducts={setProductsFilters}
                setFilteredCharacters={() => { }}
                flag={SECTION}
            />
            <ContainerSectionComponent
                titleSection={"Serie / Película"}
                titleListSection={"Listado de Series y Peliculas"}
                detailElement={productDto}
                detailLabels={detailLabelsProduct}
                listElement={productsFilters?.map(e => mapProductToDetailsCardElement(e)) ?? []}
                editElement={handleOpenModalEditProduct}
                deleteElement={deleteProduct}
                sectionSelected={SECTION}
            />
            <Button
                onClick={handleOpenModalCreateProduct}
                sx={{ backgroundColor: '#161732' }}
                size='large' style={{ margin: '20px 4px' }}
                variant="contained"
                color="primary">
                Agregar Producto
            </Button>
        </Fragment>
    );
}

export default ProductPage;