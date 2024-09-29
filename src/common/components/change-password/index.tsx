import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import { passwordValidation } from '../../utilities/fieldValidations';
import { changePassword } from '../../../api';
import Loader from '../loader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
	onClose: any;
	onSucc: any;
}

const ChangePassword = ({ onClose = () => {}, onSucc = () => {} }: Props) => {
	const [error, setError] = useState<any>(null);
	const initialValues = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	};

	const validationSchema = Yup.object().shape({
		oldPassword: passwordValidation,
		newPassword: passwordValidation.notOneOf(
			[Yup.ref('oldPassword')],
			'Password should be different then old password',
		),
		confirmNewPassword: Yup.string()
			.required('Please confirm your password')
			.oneOf([Yup.ref('newPassword')], 'Passwords must match'),
	});

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			setError(null);
			await changePassword(values.oldPassword, values.newPassword);
			onSucc();
		} catch (error) {
			setError(error);
		}
	};
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	});
	return (
		<>
			<>
				<Dialog open={true} onClose={onClose}>
					<DialogTitle>Change Password</DialogTitle>
					<DialogContent>
						<Grid
							component="form"
							noValidate
							autoComplete="on"
							onSubmit={formik.handleSubmit}
							container
							spacing={3}
							justifyContent="center"
							size={{ xs: 12 }}
							sx={{
								textAlign: 'center',
								px: 2,
								mt: 3,
							}}
						>
							<Grid size={{ xs: 12 }}>
								<TextField
									fullWidth
									id="oldPassword"
									name="oldPassword"
									label="Old Password"
									type="password"
									autoComplete="current-password"
									value={formik.values.oldPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.oldPassword &&
										Boolean(formik.errors.oldPassword)
									}
									helperText={
										formik.touched.oldPassword &&
										formik.errors.oldPassword
									}
								/>
							</Grid>
							<Grid size={{ xs: 12 }}>
								<TextField
									fullWidth
									id="newPassword"
									name="newPassword"
									label="New Password"
									type="password"
									autoComplete="current-password"
									value={formik.values.newPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.newPassword &&
										Boolean(formik.errors.newPassword)
									}
									helperText={
										formik.touched.newPassword &&
										formik.errors.newPassword
									}
								/>
							</Grid>
							<Grid size={{ xs: 12 }}>
								<TextField
									fullWidth
									id="confirmNewPassword"
									name="confirmNewPassword"
									label="Confirm New Password"
									type="password"
									autoComplete="new-password"
									value={formik.values.confirmNewPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.confirmNewPassword &&
										Boolean(
											formik.errors.confirmNewPassword,
										)
									}
									helperText={
										formik.touched.confirmNewPassword &&
										formik.errors.confirmNewPassword
									}
								/>
							</Grid>

							<Grid
								container
								size={{ xs: 12 }}
								spacing={3}
								alignItems="center"
							>
								{error && (
									<Alert severity="error">
										Oops!{' '}
										{error?.response?.data?.message ||
											error?.message}
									</Alert>
								)}
							</Grid>
							<Grid size={{ xs: 12 }} spacing={3} container>
								<Grid size={{ xs: 12 }} spacing={2}>
									<div
										style={{
											display: 'flex',
											justifyContent: 'right',
										}}
									>
										<Button
											onClick={onClose}
											sx={{ mr: 2 }}
										>
											Cancel
										</Button>
										<Button
											type="submit"
											color="primary"
											variant="contained"
										>
											Change Password
										</Button>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>

					{formik.isSubmitting && <Loader />}
				</Dialog>
			</>
		</>
	);
};

export default ChangePassword;
