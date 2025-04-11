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
            <SidebarComponent />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: '64px',
                    minHeight: 'calc(100vh - 64px)',
                }}>
                <Box
                    sx={{
                        marginLeft: '270px',
                        width: '100%',
                        overflowY: 'auto',
                        padding: 2,
                    }}
                >
                    <Container sx={{ with: '100%', margin: '0px auto', minWidth: '1000px' }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Fragment>
    );
};

export default AdminLayoutComponent;