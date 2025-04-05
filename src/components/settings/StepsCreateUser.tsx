import { Fragment, useState } from "react";

import { Typography } from "@mui/material";

import SteperComponent from "../common/SteperComponent";
import { ButtonComponent } from "../common/ButtonComponent";


const StepsCreateUser = () => {

    const steps = ['Creación de usuario', 'creación de persona'];

    const [activeStep, setActiveStep] = useState<number>(0);

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <Fragment>
            <Typography variant="h6">{"Creación de usuario"}</Typography>
            <SteperComponent
                steps={steps}
                active={activeStep}
            />
            <ButtonComponent
                label={"siguiente"}
                size={"medium"}
                isAuthenticated={true}
                isAuthorized={true}
                margin={'10px'}
                onClick={nextStep}
            />
        </Fragment>
    )
}

export default StepsCreateUser;