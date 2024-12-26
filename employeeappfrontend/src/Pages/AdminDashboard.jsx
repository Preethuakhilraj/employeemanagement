import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import axiosInstance from './axiosinterceptor';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [employee, setemployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/admin/view');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="5vh">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const handleAddition = () => {
    navigate('/form');
  };

  const handleUpdate = async (row) => {
    setemployee(row);
    console.log(employee)
    navigate('/form', { state: row });
    try {
      await axiosInstance.put(`/admin/edit/${row._id}`, row);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axiosInstance.delete(`/admin/remove/${row._id}`);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        marginTop: { xs: '20px', md: '100px' },
        padding: { xs: 2, md: 3 },
        width: { xs: '90vw', md: '85vw' },
        marginLeft: { xs: '5vw', md: '100px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: { xs: 'center', md: 'left' },
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          EMPLOYEE LIST - ADMIN DASHBOARD
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding: { xs: 1, md: 2 },
          }}
          onClick={handleAddition}
        >
          Register New Employee
        </Button>
      </Box>

      <hr />
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 600 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>EMPLOYEE ID</TableCell>
              <TableCell>EMPLOYEE NAME</TableCell>
              <TableCell align="left">DESIGNATION</TableCell>
              <TableCell align="left">LOCATION</TableCell>
              <TableCell align="left">SALARY</TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'common.white',
                  },
                }}
              >
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button variant="contained" size="small" onClick={() => handleUpdate(row)}>UPDATE</Button>
                  <Button variant="contained" size="small" color="error" onClick={() => handleDelete(row)}>DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
