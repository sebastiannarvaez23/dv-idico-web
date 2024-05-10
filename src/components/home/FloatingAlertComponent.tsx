import React from 'react';
import Alert from '@mui/material/Alert';

const alertContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: '90%',
    maxWidth: '400px',
};

interface AlertProps {
    type: 'success' | 'error' | 'info';
    message: string;
    onClose: () => void;
}

const FloatingAlertComponent: React.FC<AlertProps> = ({ type, message, onClose }) => {
    return (
        <div style={alertContainerStyle}>
            <Alert severity={type} onClose={onClose}>
                {message}
            </Alert>
        </div>
    );
};

export default FloatingAlertComponent;
