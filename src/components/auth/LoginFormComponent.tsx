import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function LoginFormComponent() {

    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Usuario:', mail);
        console.log('Contraseña:', password);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar sesión
            </Typography>
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