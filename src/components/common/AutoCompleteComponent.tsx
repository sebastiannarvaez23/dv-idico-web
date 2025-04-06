import { useEffect, useState } from "react";

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';

import { useDebounce } from "../../hooks/useDebounce.hook";

interface AutoCompleteComponentProps {
    list: AutocompleteSelectItem[];
    label: string;
    loading: boolean;
    value: AutocompleteSelectItem | null;
    touched?: boolean;
    errors?: string | any;
    getList: (pg: number, filter: string) => void;
    onSelect: (value: AutocompleteSelectItem | null) => void;
}

const AutoCompleteComponent = ({ list, label, loading, touched, errors, value, getList, onSelect }: AutoCompleteComponentProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const debounceSearchCodeValue = useDebounce(inputValue, 500);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            getList(1, debounceSearchCodeValue);
        })();
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getList(1, debounceSearchCodeValue);
    }, [debounceSearchCodeValue]);

    return (
        <Autocomplete
            fullWidth
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            options={list}
            loading={loading}
            value={value}
            onChange={(_, value) => onSelect(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setInputValue(e.target.value)}
                    error={Boolean(touched && errors)}
                    helperText={touched && errors ? errors : ""}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AutoCompleteComponent;