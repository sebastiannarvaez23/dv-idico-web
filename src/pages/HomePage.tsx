import { Fragment, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import SidebarComponent from '../components/home/SidebarComponent';
import useAlert from '../hooks/useAlert.hook';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import CharacterPage from './CharacterPage';
import ProductPage from './ProductPage';

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
            <SidebarComponent setSectionSelected={setSectionSelected} />
            {sectionSelected === "characters" && (
                <CharacterPage />
            ) || sectionSelected === "products" && (
                <ProductPage />
            )}
        </Fragment>
    );
}

export default HomePage;