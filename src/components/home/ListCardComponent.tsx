import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid, Card, Pagination } from '@mui/material';

import { AppDispatch } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getProduct } from '../../store/slices/product';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { mapDetailsCardElementToProduct } from '../../utils/mappers/product.mapper';
import RowListComponent from '../common/RowListComponent';
import RowListLoadingComponent from '../common/RowListLoadingComponent';
import useCharacter from '../../hooks/useCharacter.hook';
import useProduct from '../../hooks/useProduct.hook';


interface ListCardComponentProps {
    margin?: string;
    height?: string;
    elements: DetailsCardElement[];
    totalRows: number;
    sectionSelected?: string;
    page: number;
    filter?: string;
    handleCheck?: (id: string, value: boolean) => void;
    handleGetElements: (pg: number, ft?: string) => void;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = (
    { elements, totalRows, sectionSelected, margin = '10px 0', height = '47vh', page, filter, handleGetElements, handleCheck }
) => {

    const { isLoadingCharacters } = useCharacter();
    const { isLoadingProducts } = useProduct();

    const [totalPages, setTotalPages] = React.useState(1);

    const dispatch = useDispatch<AppDispatch>();

    const handleClickRow = (element: DetailsCardElement): void => {
        if (sectionSelected === "products") {
            dispatch(
                getProduct(
                    mapDetailsCardElementToProduct(element).id));
        }
        if (sectionSelected === "characters") {
            dispatch(
                getCharacter(
                    mapDetailsCardElementToCharacter(element).id));
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handleGetElements(newPage, filter);
        }
    };

    React.useEffect(() => {
        const newTotalPages = Math.ceil(totalRows / 10);
        setTotalPages(newTotalPages);
    }, [elements]);

    return (
        <Card style={{ margin, height }}>
            <div style={{ padding: '20px 0', height: '60vh', maxHeight: '280px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <RowListComponent handleCheck={handleCheck} handleClickRow={handleClickRow} element={element} key={index} />
                    ))}

                    {(isLoadingCharacters || isLoadingProducts) && (
                        <RowListLoadingComponent />
                    )}
                </Grid >
            </div >
            <Pagination sx={{ justifyItems: 'center', margin: '20px 0px' }} defaultPage={1} count={totalPages} page={page ?? 1} onChange={handleChangePage} />
        </Card >
    );
};

export default ListCardComponent;
