import { Fragment } from 'react';
import FloatingAlertComponent from '../home/FloatingAlertComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useAlert from '../../hooks/useAlert.hook';
import SidebarComponent from '../home/SidebarComponent';
import NestedList from './SidebarLateralComponent';
import { Container } from '@mui/system';

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