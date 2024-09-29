import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useUserAuth } from '../../context/auth/UserAuthContext';

const Home: React.FC = () => {
	const { loading, authenticated } = useUserAuth();
	return (
		<>
			{!loading && (
				<Container
					maxWidth="md"
					sx={{
						mt: '20vh',
						textAlign: 'center',
					}}
				>
					<Typography variant="h3" gutterBottom>
						Welcome to Full Stack Test App!
					</Typography>
					{authenticated ? (
						<>
							<Box mb={4} mt={4}>
								<Typography variant="h5">
									Happy exploring!
								</Typography>
							</Box>
						</>
					) : (
						<>
							<Box mt={4} mb={2}>
								<Typography variant="h6">
									<Link
										component={RouterLink}
										underline="hover"
										to="/sign-up"
										sx={{ mr: 1 }}
									>
										Sign Up
									</Link>
									to create an account and explore the app.
								</Typography>
							</Box>

							<Box mb={4}>
								<Typography variant="h6">
									<Link
										component={RouterLink}
										underline="hover"
										to="/sign-in"
										sx={{ mr: 1 }}
									>
										Sign In
									</Link>
									if you already have an account.
								</Typography>
							</Box>
							<Box mb={4} mt={4}>
								<Typography variant="body2">
									Happy exploring!
								</Typography>
							</Box>
						</>
					)}
				</Container>
			)}
		</>
	);
};

export default Home;
