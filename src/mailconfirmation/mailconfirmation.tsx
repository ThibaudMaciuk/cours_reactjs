import React from 'react';
interface MailConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const MailConfirmation: React.FC<MailConfirmationProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmation d'envoi de courrier électronique</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default MailConfirmation;
