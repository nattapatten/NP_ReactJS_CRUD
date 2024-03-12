import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";

export default function HospitalList() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        getAllHospitals();
    }, []);

    const getAllHospitals = () => {
        fetch('http://localhost:5000/api/v1/hospitals')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                setHospitals(result.data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // const updateHospital = id => {
    //     window.location = '/update/' + id;
    // }

    const deleteHospital = id => {
        var data = {
            'id': id
        }
        const token = localStorage.getItem('token');

        fetch(`http://localhost:5000/api/v1/hospitals/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        .then(result => {
            console.log(result);
            getAllHospitals();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return (
        <Container sx={{ p: 2 }} maxWidth="lg">
            <Paper sx={{ p: 2 }}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Hospital
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" onClick={getAllHospitals}>Get All Data</Button>
                    </Box>
                    <Box>
                        <Link to="/create">
                            <Button variant="contained" color="primary">
                                CREATE
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="center">Hospital Name</TableCell>
                                <TableCell align="left">Hospital Address</TableCell>
                                <TableCell align="left">District</TableCell>
                                <TableCell align="left">Province</TableCell>
                                <TableCell align="center">Postalcode</TableCell>
                                <TableCell align="center">Tel</TableCell>
                                <TableCell align="center">Region</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitals.map(hospital => (
                                <TableRow key={hospital._id}>
                                    <TableCell align="right">{hospital._id}</TableCell>
                                    <TableCell align="left">{hospital.name}</TableCell>
                                    <TableCell align="left">{hospital.address}</TableCell>
                                    <TableCell align="left">{hospital.district}</TableCell>
                                    <TableCell align="left">{hospital.province}</TableCell>
                                    <TableCell align="center">{hospital.postalcode}</TableCell>
                                    <TableCell align="center">{hospital.tel}</TableCell>
                                    <TableCell align="center">{hospital.region}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button onClick={() => navigate(`/update/${hospital._id}`)}>Edit</Button>
                                            <Button onClick={() => deleteHospital(hospital._id)}>Delete</Button>
                              
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
