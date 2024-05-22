import { Fragment, useState } from 'react';
import { createProduct, deleteProduct, updateProduct } from '../store/slices/product';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SearchElementComponent from '../components/home/SearchElementComponent';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import ModalComponent from '../components/home/ModalComponent';
import useProduct from '../hooks/useProduct.hook';
import FormProductComponent from '../components/home/FormProductComponent';

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
                open={modalCreateProduct}
                onClose={handleCloseModalCreateProduct}>
                <FormProductComponent
                    title="Agregar Producto"
                    setModalOpen={setModalCreateProduct}
                    productSelected={productEmpty}
                    action={createProduct} />
            </ModalComponent>
            <ModalComponent
                open={modalEditProduct}
                onClose={handleCloseModalEditProduct}>
                <FormProductComponent title="Editar Producto"
                    setModalOpen={setModalEditProduct}
                    productSelected={productSelected}
                    action={updateProduct}
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