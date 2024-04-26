import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../services/auth';

function LoginFormComponent() {
    const [mail, setMail] = useState('sebastian.doe@example.com');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const newToken = await signin(mail, password);
            localStorage.setItem('token', newToken);
            navigate('/');
        } catch (error) {
            setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales y vuelve a intentarlo.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar sesión
            </Typography>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar sesión
                </Button>
            </form>
        </Container>
    );
}

export default LoginFormComponent;
