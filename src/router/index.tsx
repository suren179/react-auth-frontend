import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from '../context/auth/UserAuthContext';
import PrivateRoute from './privateRoute';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ROUTES } from '../common/constants';

import Loader from '../common/components/loader';

const NavBar = lazy(() => import('../common/components/navbar'));
const SignIn = lazy(() => import('../routes/sign-in'));
const SignUp = lazy(() => import('../routes/sign-up'));
const Dashboard = lazy(() => import('../routes/dashboard'));
const Home = lazy(() => import('../routes/home'));
const NotFound = lazy(() => import('../routes/not-found'));
const Profile = lazy(() => import('../routes/profile'));

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<UserAuthProvider>
					<CssBaseline />

					<Suspense fallback={<Loader />}>
						<NavBar />
					</Suspense>
					<Box
						id="routes"
						display="flex"
						justifyContent="center"
						alignItems="center"
						sx={(theme) => ({
							// width: '100%',
							//mt: 2,
							pl: 2,
							pr: 2,
						})}
					>
						<Routes>
							<Route
								path={ROUTES.home}
								element={
									<Suspense fallback={<Loader />}>
										<Home />
									</Suspense>
								}
							/>
							<Route
								path={ROUTES.signUp}
								element={
									<Suspense fallback={<Loader />}>
										<SignUp />
									</Suspense>
								}
							/>
							<Route
								path={ROUTES.signIn}
								element={
									<Suspense fallback={<Loader />}>
										<SignIn />
									</Suspense>
								}
							/>
							<Route
								path={ROUTES.dashboard}
								element={
									<Suspense fallback={<Loader />}>
										<PrivateRoute component={Dashboard} />
									</Suspense>
								}
							/>
							<Route
								path={ROUTES.profile}
								element={
									<Suspense fallback={<Loader />}>
										<PrivateRoute component={Profile} />
									</Suspense>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Box>
				</UserAuthProvider>
			</BrowserRouter>
		</>
	);
};

export default Router;
