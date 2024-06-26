import React from 'react';
import { Grid, Card } from '@mui/material';
import { mapDetailsCardElementToProduct } from '../../utils/mappers/product.mapper';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getProduct } from '../../store/slices/product';
import RowListComponent from '../common/RowListComponent';
import RowListLoadingComponent from '../common/RowListLoadingComponent';

interface ListCardComponentProps {
    elements: DetailsCardElement[];
    sectionSelected: string;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = ({ elements, sectionSelected }) => {

    const { isLoadingCharacters } = useSelector(
        (state: RootState) => state.character);

    const { isLoadingProducts } = useSelector(
        (state: RootState) => state.product);


    const dispatch = useDispatch<AppDispatch>();

    const handleClickRow = (element: DetailsCardElement): void => {
        if (sectionSelected === "products") {
            dispatch(
                getProduct(
                    mapDetailsCardElementToProduct(element).endpoint));
        }
        if (sectionSelected === "characters") {
            dispatch(
                getCharacter(
                    mapDetailsCardElementToCharacter(element).endpoint));
        }
    }

    return (
        <Card style={{ margin: '10px 0', height: '47vh' }}>
            <div style={{ padding: '20px 0', maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <RowListComponent handleClickRow={handleClickRow} element={element} key={index} />
                    ))}

                    {(isLoadingCharacters || isLoadingProducts) && (
                        <RowListLoadingComponent />
                    )}
                </Grid >
            </div >
        </Card >
    );
};

export default ListCardComponent;
