import { Fragment, useState } from "react";

import SteperComponent from "../common/SteperComponent";
import FormUserComponent from "./FormUserComponent";
import useUser from "../../hooks/useUser.hook";
import FormPersonComponent from "./FormPersonComponent";
import usePerson from "../../hooks/usePerson.hook";


const StepsCreateUser = () => {

    const steps = ['Creación de usuario', 'creación de persona'];

    const [activeStep, setActiveStep] = useState<number>(2);
    const [modalOpen, setOpenModal] = useState<boolean>(false);

    const { userEmpty, userSelected, page: pageUser, handleCreateUser } = useUser();
    const { personEmpty, page: pagePerson, handleCreatePerson } = usePerson();

    const createUser = (user: User) => {
        handleCreateUser(user);
        nextStep();
    }

    const createPerson = (person: Person) => {
        handleCreatePerson(person);
    }

    const nextStep = () => {
        if (activeStep < steps.length) {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <Fragment>
            <SteperComponent
                steps={steps}
                active={activeStep}
            />
            {(() => {
                switch (activeStep) {
                    case 1:
                        return (
                            <FormUserComponent
                                userSelected={userEmpty}
                                title={"Creación de usuario"}
                                page={pageUser}
                                setModalOpen={setOpenModal}
                                action={(user) => createUser(user)}
                            />
                        );
                    case 2:
                        return (
                            <FormPersonComponent
                                userSelected={userSelected}
                                personSelected={personEmpty}
                                title={"Creación de persona"}
                                page={pagePerson}
                                setModalOpen={setOpenModal}
                                action={(person) => createPerson(person)}
                            />
                        );
                    default:
                        return null;
                }
            })()}
        </Fragment>
    )
}

export default StepsCreateUser;