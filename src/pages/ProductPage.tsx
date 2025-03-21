import { Fragment } from 'react';

import { Rating } from '@mui/material';

import { ButtonComponent } from '../components/common/ButtonComponent';
import { mapProductToDetailsCardElement } from '../utils/mappers/product.mapper';
import ContainerSectionComponent from '../components/home/ContainerSectionComponent';
import FormProductComponent from '../components/home/FormProductComponent';
import InformationProductComponent from '../components/home/InformationProductComponent';
import ModalComponent from '../components/common/ModalComponent';
import SearchElementComponent from '../components/home/SearchElementComponent';
import useProduct from '../hooks/useProduct.hook';
import useSession from '../hooks/useSession.hook';


const ProductPage = () => {

    const SECTION: TypSection = "products";

    const { isAuthenticated, handleValidateAuthorization } = useSession();
    const {
        count,
        detailLabelsProduct,
        filter,
        modalAssigmentCharacter,
        modalCreateProduct,
        modalEditProduct,
        page,
        productEmpty,
        products,
        productSelected,
        handleCloseModalAssigmentCharacter,
        handleCloseModalCreateProduct,
        handleCloseModalEditProduct,
        handleCreateProduct,
        handleDeleteProduct,
        handleGetProducts,
        handleOpenModalAssigmentCharacter,
        handleOpenModalCreateProduct,
        handleOpenModalEditProduct,
        handleUpdateProduct,
        setModalCreateProduct,
        setModalEditProduct,
    } = useProduct();

    const productDto: DetailsCardElement = mapProductToDetailsCardElement(productSelected);

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
                    action={handleCreateProduct}
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
                    action={handleUpdateProduct}
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
                    deleteElement={handleDeleteProduct}
                    editElement={handleOpenModalEditProduct}>
                    <Rating
                        readOnly
                        name="qualification"
                        value={(productDto.field3) ? parseInt(productDto.field3) : 0}
                    />
                </InformationProductComponent>
            </ContainerSectionComponent>
            <ButtonComponent
                isAuthenticated={isAuthenticated}
                isAuthorized={handleValidateAuthorization('0603')}
                label={'Agregar Producto'}
                margin={'20px 4px'}
                size={'large'}
                onClick={handleOpenModalCreateProduct}
            />
        </Fragment>
    );
}

export default ProductPage;