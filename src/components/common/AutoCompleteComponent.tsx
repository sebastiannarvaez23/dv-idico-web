import { Fragment } from "react";

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

interface SelectAutocompleteItem {
    label: string;
    value: string;
}

interface AutoCompleteComponentProps {
    list: SelectAutocompleteItem[];
    label: string;
}

const AutoCompleteComponent = ({ list, label }: AutoCompleteComponentProps) => {
    return (
        <Fragment>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={list}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="normal"
                        label={label}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </Fragment>
    );
};

export default AutoCompleteComponent;