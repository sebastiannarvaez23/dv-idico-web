import { useState, useEffect } from 'react';

export type AlertType = 'success' | 'error' | 'info';

interface AlertState {
    type: AlertType;
    message: string;
}

const useAlert = () => {

    const [alert, setAlert] = useState<AlertState | null>(null);

    const showAlert = (type: AlertType, message: string) => {
        setAlert({ type, message });
        console.log("ALERTA", type, message);
    };

    const hideAlert = () => {
        setAlert(null);
    };

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (alert) {
            timeoutId = setTimeout(() => {
                hideAlert();
            }, 3000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [alert]);

    return { showAlert, hideAlert, alert };
};

export default useAlert;
