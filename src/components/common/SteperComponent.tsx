import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface SteperComponentProps {
    steps: string[];
    active: number;
}

const SteperComponent = ({ steps, active }: SteperComponentProps) => {
    return (
        <Box sx={{ width: '100%', margin: '24px 10px' }}>
            <Stepper activeStep={active} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default SteperComponent;