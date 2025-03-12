import { Fragment, useEffect, useState } from 'react';

import { Paper, styled, InputBase } from '@mui/material';

import { useDebounce } from '../../hooks/useDebounce.hook';


const SearchContainer = styled(Paper)({
    width: '100%',
    margin: '140px auto 0 auto',
    padding: '10px',
});

const SearchInput = styled(InputBase)({
    width: '100%',
    padding: '10px',
    fontSize: '16px',
});

interface SearchElementProps {
    flag: TypSection;
    handleGetProducts?: (pg: number, q?: string) => void;
    handleGetCharacters?: (pg: number, q?: string) => void;
}

const SearchElementComponent = ({ handleGetProducts, handleGetCharacters, flag }: SearchElementProps) => {

    const [searchValue, setSearchValue] = useState<string>('');

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (handleGetProducts && flag === 'products') {
            if (debounceValue && debounceValue.length > 3) {
                handleGetProducts(1, debounceValue);
            }

            if (!debounceValue) {
                handleGetProducts(1);
            }
        }

        if (handleGetCharacters && flag === 'characters') {
            if (debounceValue && debounceValue.length > 3) {
                handleGetCharacters(1, debounceValue);
            }
            if (!debounceValue) {
                handleGetCharacters(1);
            }
        }
    }, [debounceValue]);

    return (
        <Fragment>
            <SearchContainer elevation={3}>
                <SearchInput
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'buscar' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </SearchContainer>
        </Fragment >
    );
}

export default SearchElementComponent;