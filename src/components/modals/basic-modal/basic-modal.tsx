import { Box, Modal} from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type BasicModalProps = {
    isOpen: boolean,
    handleClose: () => void,
} & PropsWithChildren

export const BasicModal: FC<BasicModalProps> = ({ isOpen, handleClose, children }) => {

    return <Modal
        open={isOpen}
        onClose={handleClose}
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            width: 'min(400px, 95vw)',
            borderRadius: '10px',
            boxShadow: 24,
            padding: '1rem 1.5rem 1.5rem',
        }}>
            {children}
        </Box>
    </Modal>
}