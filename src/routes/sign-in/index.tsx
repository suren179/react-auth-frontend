import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Loader from '../../common/components/loader';

import {
	emailValidation,
	passwordValidation,
} from '../../common/utilities/fieldValidations';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../common/constants';

const SignIn: React.FC = () => {
	const { loading, authenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (authenticated) {
			navigate('/dashboard');
		}
	}, [authenticated, navigate]);

	const [error, setError] = useState<any>(null);
	const initialValues = {
		email: 'testuser123@example.com',
		password: 'Password123@',
	};

	const validationSchema = Yup.object({
		email: emailValidation,
		password: passwordValidation,
	});

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			setError(null);
			await signIn(values.email, values.password);
			window.location.href = ROUTES.dashboard;
		} catch (error) {
			setError(error);
			// console.error('Sign-in error:', error);
		}
	};
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	});
	return (
		<>
			{!loading && (
				<>
					<Grid
						component="form"
						noValidate
						autoComplete="on"
						onSubmit={formik.handleSubmit}
						container
						spacing={3}
						justifyContent="center"
						size={{ xs: 12, sm: 8, md: 6, lg: 5, xl: 4 }}
						sx={{
							mt: '20vh',
							textAlign: 'center',
							px: 2,
						}}
					>
						<Grid size={{ xs: 12 }}>
							<h2>Sign In</h2>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="email"
								name="email"
								label="Email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.email &&
									Boolean(formik.errors.email)
								}
								helperText={
									formik.touched.email && formik.errors.email
								}
							/>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="password"
								name="password"
								label="Password"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.password &&
									Boolean(formik.errors.password)
								}
								helperText={
									formik.touched.password &&
									formik.errors.password
								}
							/>
						</Grid>

						<Grid
							container
							size={{ xs: 12 }}
							spacing={3}
							alignItems="center"
						>
							<Grid size={{ xs: 12, md: 8 }}>
								{error && (
									<Alert severity="error">
										Oops!{' '}
										{error?.response?.data?.message ||
											error?.message}
									</Alert>
								)}
							</Grid>
							<Grid size={{ xs: 12, md: 4 }}>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									type="submit"
								>
									Sign In
								</Button>
							</Grid>
						</Grid>
					</Grid>

					{formik.isSubmitting && <Loader />}
				</>
			)}
		</>
	);
};

export default SignIn;
