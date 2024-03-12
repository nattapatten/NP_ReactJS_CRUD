import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Login() {

    const navigate = useNavigate(); // Use useNavigate instead of useHistory


    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'email': email,
            'password': password,
        }
        fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                localStorage.setItem('token', result.token);
                navigate('/viewhospital'); // Use navigate instead of history.push

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container sx={{ p: 2 }} maxWidth="sm">
            <Card sx={{ width: '100%', maxWidth: 400 }}>
                <CardContent>
                    <div style={{ textAlign: 'center' }}>
                        <Typography component="h1" variant="h5">
                            VacQ
                        </Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Grid container sx={{ pt: 2 }} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="current-password"
                                    name="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    
                                // autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}
