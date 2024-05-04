import { Modal, Box } from '@mui/material';

interface ModalComponentProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, children }) => {
    return (
        <Modal style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} open={open} onClose={onClose}>
            <Box sx={{ width: '50%', bgcolor: 'background.paper', p: 2 }}>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalComponent;