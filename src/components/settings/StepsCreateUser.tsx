import { Fragment, useState } from "react";

import SteperComponent from "../common/SteperComponent";
import FormUserComponent from "./FormUserComponent";
import useUser from "../../hooks/useUser.hook";


const StepsCreateUser = () => {

    const steps = ['Creación de usuario', 'creación de persona'];

    const [activeStep, setActiveStep] = useState<number>(0);
    const [modalOpen, setOpenModal] = useState<boolean>(false);

    const { userEmpty, page } = useUser();

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <Fragment>
            <SteperComponent
                steps={steps}
                active={activeStep}
            />
            <FormUserComponent
                userSelected={userEmpty}
                title={"Creación de usuario"}
                page={page}
                setModalOpen={setOpenModal}
                action={() => nextStep} />
        </Fragment>
    )
}

export default StepsCreateUser;