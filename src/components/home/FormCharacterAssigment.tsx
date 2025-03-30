import { useState, useEffect } from "react";

import { Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';

import { fetchGetCharactersAssignedProduct } from '../../services/character';
import { mapCharacterAssignedToDetailsCardElement } from '../../utils/mappers/character-assigment.mapper';
import { uribuild } from '../../utils/params/uribuild';
import ListCardComponent from './ListCardComponent';
import useCharacter from "../../hooks/useCharacter.hook";
import useProduct from '../../hooks/useProduct.hook';
import { ContainListRowAssigmentCharacter } from "./ContainListRowAssigmentCharacter";


interface FormCharacterProps {
    productSelected: Product;
    setModalOpen: (fun: boolean) => void;
}

const FormCharacterAssigment = ({ productSelected, setModalOpen }: FormCharacterProps) => {

    const { page } = useCharacter();
    const { handleAssignCharacterToProduct, handleRevokeCharacterToProduct } = useProduct();

    const [toInclude, setToInclude] = useState<string[]>([]);
    const [toExclude, setToExclude] = useState<string[]>([]);
    const [characters, setCharacters] = useState<DetailsCardElement[]>([]);
    const [charactersBackUp, setCharactersBackUp] = useState<CharacterAssigment[]>([]);
    const [totalRows, setTotalRows] = useState<number>(0);

    const formik = useFormik<{ addCharacters: string[], deleteCharacters: string[] }>({
        initialValues: {
            addCharacters: [],
            deleteCharacters: [],
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleCheck = (id: string, value: boolean) => {
        const characterBackUp = charactersBackUp.find(e => e.id === id);
        if (value && !toInclude.includes(id)) {
            if (characterBackUp?.assigned === false) {
                setToInclude([...toInclude, id]);
            } else {
                const newIds = toExclude.filter((uuid) => uuid !== id);
                setToExclude(newIds);
            }
        }
        if (!value && !toExclude.includes(id)) {
            if (characterBackUp?.assigned === true) {
                setToExclude([...toExclude, id]);
            } else {
                const newIds = toInclude.filter((uuid) => uuid !== id);
                setToInclude(newIds);
            }
        }

        const ch: DetailsCardElement[] = characters.map(e => {
            if (e.id === id) e.check1 = value;
            return e;
        })
        setCharacters(ch);
    }

    const handleSubmit = async (characters: { addCharacters: string[], deleteCharacters: string[] }) => {
        if (characters.addCharacters.length > 0) handleAssignCharacterToProduct({ characters: characters.addCharacters });
        if (characters.deleteCharacters.length > 0) handleRevokeCharacterToProduct({ characters: characters.deleteCharacters });
        await setModalOpen(false);
    };

    // TODO: Migrate to service and thunk
    const fetchData = async (pg: number) => {
        try {
            const response = await fetchGetCharactersAssignedProduct(productSelected.id, uribuild({ page: pg }));
            setCharactersBackUp(response.rows);
            const ch = response.rows.map(e => {
                if (toInclude.includes(e.id)) e.assigned = true
                return mapCharacterAssignedToDetailsCardElement(e)
            }) ?? []
            setTotalRows(response.count);
            setCharacters(ch);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, []);

    useEffect(() => {
        formik.setFieldValue('addCharacters', toInclude);
    }, [toInclude]);

    useEffect(() => {
        formik.setFieldValue('deleteCharacters', toExclude);
    }, [toExclude]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={2}>
                <div>
                    <Typography variant="h6">Asignar personajes</Typography>
                    <hr />
                    <TextField
                        fullWidth
                        id="outlined-suffix-shrink"
                        label="Nombre personaje"
                        variant="outlined"
                    />
                    <ListCardComponent
                        height={'40vh'}
                        elements={characters}
                        totalRows={totalRows}
                        page={page}
                        handleCheck={handleCheck}
                        handleGetElements={(pg: number) => { fetchData(pg) }}
                        rowComponent={ContainListRowAssigmentCharacter}
                    />
                </div>
                <Button
                    sx={{ backgroundColor: '#161732' }}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                >Asignar
                </Button>
            </Box>
        </form>
    )
}

export default FormCharacterAssigment;
