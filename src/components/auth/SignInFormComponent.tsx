import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchSignin } from '../../services/auth';

const LoginFormComponent = () => {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (mail === '' || password === '') {
                setError('Complete el formulario para iniciar sesión.');
                return;
            }
            const newToken = await fetchSignin(mail, password);
            localStorage.setItem('token', newToken);
            navigate('/');
        } catch (error) {
            setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales y vuelve a intentarlo.');
        }
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: '28vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar sesión
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Usuario"
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
                <Button sx={{ backgroundColor: '#161732', marginTop: '12px' }} type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar sesión
                </Button>
            </form>
        </Container>
    );
}

export default LoginFormComponent;
