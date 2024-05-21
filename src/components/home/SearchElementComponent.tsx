import { Fragment, useEffect, useState } from 'react';
import { Grid, Paper, styled, InputBase, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
    setFilteredProducts: (arg: Product[]) => void;
    setFilteredCharacters: (arg: Character[]) => void;
}

const SearchElementComponent = ({ setFilteredProducts, setFilteredCharacters, flag }: SearchElementProps) => {

    const { characters } = useSelector(
        (state: RootState) => state.character);

    const { products } = useSelector(
        (state: RootState) => state.product);

    const [searchValue, setSearchValue] = useState<string>('');
    const [filterTypeProduct, setFilterTypeProduct] = useState<string>('title');
    const [filterTypeCharacter, setFilterTypeCharacter] = useState<string>('name');

    useEffect(() => {
        if (filterTypeProduct === 'title') {
            if (searchValue) {
                const filteredList = products.filter(movie =>
                    movie.title.toLowerCase().includes(searchValue.toLowerCase())
                );
                setFilteredProducts(filteredList);
            } else {
                setFilteredProducts(products);
            }
        }
        if (filterTypeProduct === 'gender') {
            if (searchValue) {
                const filteredList = products.filter(movie =>
                    movie.gender.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                setFilteredProducts(filteredList);
            } else {
                setFilteredProducts(products);
            }
        }
    }, [searchValue, products, setFilteredProducts]);

    useEffect(() => {
        if (searchValue) {
            const filteredList = characters.filter(character =>
                character.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredCharacters(filteredList);
        } else {
            setFilteredCharacters(characters);
        }
    }, [searchValue, characters, setFilteredCharacters]);

    return (
        <Fragment>
            <SearchContainer elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SearchInput
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'buscar' }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>

                        {flag === 'products' && (
                            <Fragment>
                                <Select
                                    variant="outlined"
                                    style={{ width: '80%' }}
                                    value={filterTypeProduct}
                                    onChange={(e) => setFilterTypeProduct(e.target.value)}
                                >
                                    <MenuItem value="title">Titulo</MenuItem>
                                    <MenuItem value="gender">Género</MenuItem>
                                </Select>
                            </Fragment>
                        ) || (
                                <Fragment>
                                    <Select
                                        variant="outlined"
                                        style={{ width: '80%' }}
                                        value={filterTypeCharacter}
                                        onChange={(e) => setFilterTypeCharacter(e.target.value)}
                                    >
                                        <MenuItem value="name">Nombre</MenuItem>
                                    </Select>
                                </Fragment>
                            )}
                    </Grid>
                </Grid>
            </SearchContainer>
        </Fragment >
    );
}

export default SearchElementComponent;