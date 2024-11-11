import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Card, Pagination } from '@mui/material';

import { AppDispatch, RootState } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getProduct } from '../../store/slices/product';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { mapDetailsCardElementToProduct } from '../../utils/mappers/product.mapper';
import RowListComponent from '../common/RowListComponent';
import RowListLoadingComponent from '../common/RowListLoadingComponent';


interface ListCardComponentProps {
    elements: DetailsCardElement[];
    sectionSelected: string;
    totalRows: number;
    handleGetCharacters: (np: number) => void;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = ({ elements, totalRows, sectionSelected, handleGetCharacters }) => {

    const { isLoadingCharacters } = useSelector(
        (state: RootState) => state.character);

    const { isLoadingProducts } = useSelector(
        (state: RootState) => state.product);

    const [totalPages, setTotalPages] = React.useState(1);
    const [page, setPage] = React.useState(1);

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
            setPage(newPage);
            handleGetCharacters(newPage);
        }
    };

    React.useEffect(() => {
        const newTotalPages = Math.ceil(totalRows / 10);
        setTotalPages(newTotalPages);
    }, [elements]);

    return (
        <Card style={{ margin: '10px 0', height: '47vh' }}>
            <div style={{ padding: '20px 0', height: '60vh', maxHeight: '280px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <RowListComponent handleClickRow={handleClickRow} element={element} key={index} />
                    ))}

                    {(isLoadingCharacters || isLoadingProducts) && (
                        <RowListLoadingComponent />
                    )}
                </Grid >
            </div >
            <Pagination sx={{ justifyItems: 'center', margin: '20px 0px' }} defaultPage={1} count={totalPages} page={page} onChange={handleChangePage} />
        </Card >
    );
};

export default ListCardComponent;
