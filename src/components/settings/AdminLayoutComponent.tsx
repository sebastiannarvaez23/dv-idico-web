import { Fragment } from 'react';

import { Box, Container } from '@mui/system';

import FloatingAlertComponent from '../home/FloatingAlertComponent';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from '../common/TopbarComponent';
import useAlert from '../../hooks/useAlert.hook';

const AdminLayoutComponent = ({ children }: { children: React.ReactNode }) => {

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
            <TopbarComponent />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '20% 80%',
                    minHeight: '100vh',
                    mt: '64px'
                }}>
                <SidebarComponent />
                <Container sx={{ with: '100%', margin: '0px auto', minWidth: '1000px' }}>
                    {children}
                </Container>
            </Box>
        </Fragment>
    );
};

export default AdminLayoutComponent;