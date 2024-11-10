import { Fragment, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import CharacterPage from './CharacterPage';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import NavbarAppComponent from '../components/home/NavbarAppComponent';
import ProductPage from './ProductPage';
import SidebarComponent from '../components/common/SidebarComponent';
import useAlert from '../hooks/useAlert.hook';

const HomePage = () => {

    const { alert } = useSelector(
        (state: RootState) => state.common);

    const { hideAlert } = useAlert();

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
            <SidebarComponent />
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