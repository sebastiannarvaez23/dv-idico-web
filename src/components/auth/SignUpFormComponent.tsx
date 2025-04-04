import React from 'react';

import { Container, Typography, TextField, Button } from '@mui/material';

import { DataFormRegister } from '../../interfaces/data-form-register.interface';
import { fetchSignup } from '../../services/auth';


interface ComponentSignUpFormProps {
    handleShowLogin: () => void;
}

const SignUpFormComponent = ({ handleShowLogin }: ComponentSignUpFormProps) => {

    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [error, setError] = React.useState('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthdate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            setError('Las contraseñas no coinciden');
            return;
        }
        const dataFormRegister: DataFormRegister = {
            name: name,
            lastname: lastname,
            mail: mail,
            birthdate: birthdate,
            phone: phone,
            password: password,
        }
        fetchSignup(dataFormRegister);
        handleShowLogin();
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: '8vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Resgistro de usuario
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Fecha de Nacimiento"
                    variant="outlined"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={birthdate}
                    onChange={handleDateChange}
                    margin="normal"
                />
                <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <TextField
                    label="Confirmar Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    margin="normal"
                    error={error !== ''}
                    helperText={error}
                />
                <Button sx={{ backgroundColor: '#161732', marginTop: '12px' }} type="submit" variant="contained" color="primary" fullWidth>
                    Registrarse
                </Button>
            </form>
        </Container>
    );
}

export default SignUpFormComponent;