import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function HospitalUpdate() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/hospitals/" + id)
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const hospitalData = result.data;
                    setId(hospitalData._id);
                    setName(hospitalData.name);
                    setAddress(hospitalData.address);
                    setDistrict(hospitalData.district);
                    setProvince(hospitalData.province);
                    setPostalcode(hospitalData.postalcode);
                    setTel(hospitalData.tel);
                    setRegion(hospitalData.region);
                } else {
                    console.error('Failed to fetch hospital data');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            '_id': _id,
            'name': name,
            'address': address,
            'district': district,
            'province': province,
            'postalcode': postalcode,
            'tel': tel,
            'region': region
        };
        const token = localStorage.getItem('token');

        fetch(`http://localhost:5000/api/v1/hospitals/${id}`, {
            method: 'PUT',
            headers: {
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
                if (result.success === true) {
                    alert('Update Hospital Success');
                    navigate('/viewhospital');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const [_id, setId] = useState('');
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
                    Update Hospital
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container sx={{ pt: 2 }} spacing={2}>
                        <Grid Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="id"
                                variant="outlined"
                                required
                                fullWidth
                                id="id"
                                label="Hospital ID"
                                value={_id}
                                onChange={(e) => setId(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Hospital Name"
                                value={name}
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
                                value={address}
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
                                value={district}
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
                                value={province}
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
                                value={postalcode}
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
                                value={tel}
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
                                value={region}
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
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
