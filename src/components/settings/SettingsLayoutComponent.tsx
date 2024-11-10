import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';

import { RootState } from '../../store/store';
import FloatingAlertComponent from '../home/FloatingAlertComponent';
import NestedList from './SidebarLateralComponent';
import SidebarComponent from '../common/SidebarComponent';
import useAlert from '../../hooks/useAlert.hook';

const SettingsLayoutComponent = ({ children }: { children: React.ReactNode }) => {

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
            <NestedList />
            <Container sx={{ position: 'relative', left: 120, margin: '100px auto', width: "80%" }}>
                {children}
            </Container>
        </Fragment>
    );
};

export default SettingsLayoutComponent;