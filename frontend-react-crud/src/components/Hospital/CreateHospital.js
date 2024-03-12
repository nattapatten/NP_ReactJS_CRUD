import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function HospitalCreate() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'name': name,
            'address': address,
            'district': district,
            'province': province,
            'postalcode': postalcode,
            'tel': tel,
            'region': region
        }
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/v1/hospitals', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            if(result['success'] === true) { // Check against boolean true instead of string 'true'
                alert('Create Hospital Success'); // Correct the alert message syntax
                navigate('/viewhospital');
            }
        })        
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
            // .then(res => res.json())
            // .then(
            //     (result) => {
            //         // alert(result['success'])
            //         if (result['status'] === 'ok') {
            //             //   window.location.href = '/viewhospital';



            //             navigate('/viewhospital');
            //         }
            //     }
            // )
    }


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [tel, setTel] = useState('');
    const [region, setRegion] = useState('');

    return (
        <Container sx={{ p: 2 }} maxWidth="sm">
            <div>
                <Typography component="h1" variant="h5">
                    Create Hospital
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container sx={{ pt: 2 }} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Hospital Name"
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="district"
                                label="District"
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="province"
                                label="Province"
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="postalcode"
                                label="Postal Code"
                                onChange={(e) => setPostalcode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="tel"
                                label="Telephone No."
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="region"
                                label="Region"
                                onChange={(e) => setRegion(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}