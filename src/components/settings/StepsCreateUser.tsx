import { Fragment, useState } from "react";

import SteperComponent from "../common/SteperComponent";
import FormUserComponent from "./FormUserComponent";
import useUser from "../../hooks/useUser.hook";
import FormPersonComponent from "./FormPersonComponent";
import usePerson from "../../hooks/usePerson.hook";
import useRole from "../../hooks/useRole.hook";

interface StepsCreateUserProps {
    setOpenModal: (open: boolean) => void;
}

const StepsCreateUser = ({ setOpenModal }: StepsCreateUserProps) => {

    const steps = ['Creación de usuario', 'creación de persona'];

    const { roleEmpty } = useRole();
    const { userEmpty, userSelected, page: pageUser, handleCreateUser } = useUser();
    const { personEmpty, page: pagePerson, handleCreatePerson } = usePerson();

    const [activeStep, setActiveStep] = useState<number>(1);
    const [user, setUser] = useState<User>(userEmpty);

    const createUser = (user: User) => {
        handleCreateUser(user);
        nextStep();
    }

    const createPerson = async (person: Person) => {
        const result = await handleCreatePerson(person);
        if (result?.success) {
            await setOpenModal(false);
        }
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
                                action={(user) => createUser(user)}
                                setUser={setUser}
                            />
                        );
                    case 2:
                        return (
                            <FormPersonComponent
                                userSelected={userSelected}
                                personSelected={{ role: { ...roleEmpty }, ...personEmpty }}
                                title={"Creación de persona"}
                                page={pagePerson}
                                nickname={user?.nickname}
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