import React from 'react';

import useUser from '../../hooks/useUser';
import Loader from '../../common/components/loader';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import AccountCircle from '@mui/icons-material/AccountCircle';
const Profile: React.FC = () => {
	const { loading, data, error } = useUser();
	return (
		<>
			{!loading ? (
				<Container
					maxWidth="md"
					sx={{
						mt: '20vh',
						textAlign: 'center',
					}}
				>
					{error ? (
						<>
							<Alert severity="error">
								Oops!{' '}
								{error?.response?.data?.message ||
									error?.message}
							</Alert>
						</>
					) : (
						<>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: 100,
									height: 100,
									margin: '0 auto',
									mb: 2,
									bgcolor: 'grey.800',
									borderRadius: '50%',
								}}
							>
								<AccountCircle
									sx={{ fontSize: 80, color: 'primary.main' }}
								/>
							</Box>

							<Typography variant="h5" gutterBottom>
								{data?.name}
							</Typography>

							<Typography
								variant="body1"
								color="textSecondary"
								gutterBottom
							>
								{data?.email}
							</Typography>

							<Box mt={4}>
								<Button variant="contained" color="primary">
									Change Password
								</Button>
							</Box>
						</>
					)}
				</Container>
			) : (
				<Loader />
			)}
		</>
	);
};

export default Profile;
