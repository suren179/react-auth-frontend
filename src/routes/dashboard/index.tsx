import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
const Dashboard: React.FC = () => {
	return (
		<Container
			maxWidth="md"
			sx={{
				mt: '20vh',
				textAlign: 'center',
			}}
		>
			<Typography variant="h3" gutterBottom>
				Welcome to the application.
			</Typography>
			<Box mb={4} mt={6}>
				<Typography variant="h4">You are signed in.</Typography>
			</Box>
			<Box mb={4} mt={4}>
				<Typography variant="body2">
					Tip: Click on Profile link in Nav Bar to see you profile
					information and perform other actions
				</Typography>
			</Box>
		</Container>
	);
};

export default Dashboard;
