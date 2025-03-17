import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Typography, TextField, Button, Alert, Box } from '@mui/material';

import { EncryptionUtil } from '../../utils/cipher/encryption.util';
import useAlert from '../../hooks/useAlert.hook';
import useSession from '../../hooks/useSession.hook';


const SignInFormComponent = () => {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { handleSignIn } = useSession();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const cipher: EncryptionUtil = new EncryptionUtil(import.meta.env.VITE_SECRET_KEY!);

        if (nickname === '' || password === '') {
            setError('Complete el formulario para iniciar sesión.');
            return;
        }
        handleSignIn({ nickname, password: cipher.encrypt(password) })
            .catch(e => {
                setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales y vuelve a intentarlo.');
                console.error(e);
            });
        showAlert('success', '¡Has iniciado sesión con éxito!');
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
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
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
            <Box mt={2}>
                <a onClick={() => navigate('/')}>Continuar explorando el universo de Disney</a>
            </Box>
        </Container>
    );
}

export default SignInFormComponent;
