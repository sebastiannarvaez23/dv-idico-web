import { Fragment } from "react";

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";


interface AutoCompleteComponentProps {
    list: string[];
    label: string;
}

const AutoCompleteComponent = ({ list, label }: AutoCompleteComponentProps) => {
    return (
        <Fragment>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={list}
                renderInput={(params) => (
                    <TextField
                        {...params}
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