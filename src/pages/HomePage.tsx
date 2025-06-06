import { Fragment, useState } from 'react';

import CharacterPage from './CharacterPage';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import NavbarAppComponent from '../components/home/NavbarAppComponent';
import ProductPage from './ProductPage';
import TopBarComponent from '../components/common/TopbarComponent';
import useAlert from '../hooks/useAlert.hook';


const HomePage = () => {

    const { alert, hideAlert } = useAlert();

    const [sectionSelected, setSectionSelected] = useState<TypSection>("products");

    return (
        <Fragment>
            {(alert) && (
                <FloatingAlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            )}
            <TopBarComponent />
            <NavbarAppComponent setSectionSelected={setSectionSelected} />
            {sectionSelected === "characters" && (
                <CharacterPage />
            ) || sectionSelected === "products" && (
                <ProductPage />
            )}
        </Fragment>
    );
}

export default HomePage;