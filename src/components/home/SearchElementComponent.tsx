import { Fragment, useEffect, useState } from 'react';
import { Grid, Paper, styled, InputBase, Select, MenuItem } from '@mui/material';

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
    seriesmovies: SerieMovie[],
    setFilteredSeriesMovies: (arg: SerieMovie[]) => void,
    characters: Character[],
    setFilteredCharacters: (arg: Character[]) => void,
    flag: string
}

const SearchElementComponent = ({ seriesmovies, setFilteredSeriesMovies, characters, setFilteredCharacters, flag }: SearchElementProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [filterTypeSerieMovie, setFilterTypeSerieMovie] = useState<string>('title');
    const [filterTypeCharacter, setFilterTypeCharacter] = useState<string>('name');

    useEffect(() => {
        if (filterTypeSerieMovie === 'title') {
            if (searchValue) {
                const filteredList = seriesmovies.filter(movie =>
                    movie.title.toLowerCase().includes(searchValue.toLowerCase())
                );
                setFilteredSeriesMovies(filteredList);
            } else {
                setFilteredSeriesMovies(seriesmovies);
            }
        }
        if (filterTypeSerieMovie === 'gender') {
            if (searchValue) {
                const filteredList = seriesmovies.filter(movie =>
                    movie.gender.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                setFilteredSeriesMovies(filteredList);
            } else {
                setFilteredSeriesMovies(seriesmovies);
            }
        }
    }, [searchValue, seriesmovies, setFilteredSeriesMovies]);

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

                        {flag === 'seriemovie' && (
                            <Fragment>
                                <Select
                                    variant="outlined"
                                    style={{ width: '80%' }}
                                    value={filterTypeSerieMovie}
                                    onChange={(e) => setFilterTypeSerieMovie(e.target.value)}
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