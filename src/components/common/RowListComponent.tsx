import React from 'react';

import { Card } from '@mui/material';


interface RowListComponentProps {
    element: DetailsCardElement,
    handleClickRow: (element: DetailsCardElement) => void;
    children: React.ReactNode
}

const RowListComponent: React.FC<RowListComponentProps> = ({ children, element, handleClickRow }) => {
    return (
        <Card
            onClick={() => { handleClickRow(element) }}
            sx={{
                width: '80%',
                margin: '4px auto',
                padding: '4px 8px',
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
                },
            }}>
            {children}
        </Card>
    );
};

export default RowListComponent;