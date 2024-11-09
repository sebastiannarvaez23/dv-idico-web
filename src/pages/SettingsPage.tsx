import { Fragment } from 'react';
import FloatingAlertComponent from '../components/home/FloatingAlertComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useAlert from '../hooks/useAlert.hook';
import SidebarComponent from '../components/home/SidebarComponent';

const SettingsPage = () => {

    const { alert } = useSelector(
        (state: RootState) => state.common);

    const { hideAlert } = useAlert();

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
        </Fragment>
    );
};

export default SettingsPage;