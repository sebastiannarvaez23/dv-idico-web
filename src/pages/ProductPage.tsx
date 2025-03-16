import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Rating } from '@mui/material';

import { createProduct, deleteProduct, updateProduct } from '../store/slices/product';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import { RootState } from '../store/store';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormProductComponent from '../components/home/FormProductComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useProduct from '../hooks/useProduct.hook';
import InformationProductComponent from '../components/home/InformationProductComponent';
import { ButtonComponent } from '../components/common/ButtonComponent';


const ProductPage = () => {

    const SECTION: TypSection = "products";

    const { products, productSelected, count, page, filter } = useSelector(
        (state: RootState) => state.product);

    const productDto: DetailsCardElement = mapProductToDetailsCardElement(productSelected);

    const {
        productEmpty,
        detailLabelsProduct,
        modalCreateProduct,
        modalEditProduct,
        modalAssigmentCharacter,
        handleGetProducts,
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
                    action={createProduct}
                    page={page}
                />
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
                    page={page}
                />
            </ModalComponent>
            <SearchElementComponent
                handleGetProducts={handleGetProducts}
                flag={SECTION}
            />
            <ContainerSectionComponent
                titleSection={"Serie / Película"}
                titleListSection={"Listado de Series y Peliculas"}
                detailElement={productDto}
                totalRows={count}
                page={page}
                filter={filter}
                handleGetElements={handleGetProducts}
                listElement={products?.map(e => mapProductToDetailsCardElement(e)) ?? []}
                sectionSelected={SECTION}>
                <InformationProductComponent
                    element={productDto}
                    label={detailLabelsProduct}
                    deleteElement={deleteProduct}
                    editElement={handleOpenModalEditProduct}>
                    <Rating
                        readOnly
                        name="qualification"
                        value={(productDto.field3) ? parseInt(productDto.field3) : 0}
                    />
                </InformationProductComponent>
            </ContainerSectionComponent>
            <ButtonComponent
                authorization={true}
                label={'Agregar Producto'}
                margin={'20px 4px'}
                size={'large'}
                onClick={handleOpenModalCreateProduct}
            />
        </Fragment>
    );
}

export default ProductPage;