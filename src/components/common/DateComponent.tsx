import { Fragment } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FormControl } from "@mui/material";

import { dateToDaysjs } from "../../utils/dates/daysjs";


interface DateComponentProps {
    label: string;
    name: string;
    touched: boolean | undefined;
    errors: string | undefined;
    value: string;
    handleDateChange: (value: Dayjs | null) => void;
}

export const DateComponent = ({ label, name, touched, errors, value, handleDateChange }: DateComponentProps) => {
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="normal"
                error={touched && Boolean(errors)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                        <DatePicker
                            label={label}
                            name={name}
                            value={dateToDaysjs(value)}
                            onChange={handleDateChange}
                            slotProps={{
                                textField: {
                                    error: touched && Boolean(errors),
                                    helperText: touched && typeof errors === 'string'
                                        ? errors
                                        : undefined,
                                    fullWidth: true,
                                }
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
        </Fragment>
    );
}