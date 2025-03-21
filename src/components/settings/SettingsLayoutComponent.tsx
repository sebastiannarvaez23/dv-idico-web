import { Fragment } from 'react';

import { Container } from '@mui/system';

import FloatingAlertComponent from '../home/FloatingAlertComponent';
import NestedList from './SidebarLateralComponent';
import SidebarComponent from '../common/SidebarComponent';
import useAlert from '../../hooks/useAlert.hook';

const SettingsLayoutComponent = ({ children }: { children: React.ReactNode }) => {

    const { alert, hideAlert } = useAlert();

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