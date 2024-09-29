import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useUserAuth } from '../../../context/auth/UserAuthContext';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Loader from '../loader';
import useNavBarLinks from '../../../hooks/useNavBarLinks';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	backdropFilter: 'blur(24px)',
	border: '1px solid',
	borderColor: theme.palette.divider,
	backgroundColor: alpha(theme.palette.background.default, 0.4),
	boxShadow: theme.shadows[1],
	padding: '8px 12px',
}));

const NavBar: React.FC = () => {
	const { loading } = useUserAuth();
	const location = useLocation();
	const { navBarLeftLinks, navBarRightLink } = useNavBarLinks();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const toggleDrawer = (newOpen: any) => () => {
		setDrawerOpen(newOpen);
	};

	return (
		<>
			{!loading ? (
				<>
					<AppBar
						position="sticky"
						sx={{
							boxShadow: 0,
							bgcolor: 'transparent',
							backgroundImage: 'none',
							mt: 1,
						}}
					>
						<Container maxWidth="lg">
							<StyledToolbar variant="dense" disableGutters>
								<Box
									sx={{
										flexGrow: 1,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<IconButton
										component={RouterLink}
										to="/"
										aria-label="Menu button"
										// color="primary"
										color={
											location.pathname === '/'
												? 'success'
												: 'primary'
										}
									>
										<HomeIcon />
									</IconButton>
									<Box
										sx={{
											display: { xs: 'none', md: 'flex' },
											pl: 1,
											pr: 2,
										}}
									>
										{navBarLeftLinks.map((item) => (
											<Button
												key={item.id}
												component={RouterLink}
												to={item.pathname}
												variant={
													location.pathname ===
													item?.pathname
														? 'outlined'
														: 'text'
												}
												color={'info'}
												size="small"
												sx={{
													px: 2,
													mx: 1,
												}}
											>
												{item?.text}
											</Button>
										))}
									</Box>
								</Box>
								<Box
									sx={{
										display: { xs: 'none', md: 'flex' },
										gap: 1,
										alignItems: 'center',
									}}
								>
									{navBarRightLink?.map((item) => (
										//@ts-ignore
										<Button
											key={item?.id}
											onClick={item?.onClick}
											color={item?.color}
											variant={item?.variant}
											size="small"
										>
											{item?.text}
										</Button>
									))}
								</Box>
								<Box
									sx={{ display: { sm: 'flex', md: 'none' } }}
								>
									<IconButton
										aria-label="Menu button"
										onClick={toggleDrawer(true)}
									>
										<MenuIcon />
									</IconButton>
									<Drawer
										anchor="top"
										open={drawerOpen}
										onClose={toggleDrawer(false)}
									>
										<Box
											sx={{
												p: 2,
												backgroundColor:
													'background.default',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-between',
												}}
											>
												<IconButton
													onClick={toggleDrawer(
														false,
													)}
												>
													<CloseRoundedIcon />
												</IconButton>
											</Box>
											<Divider sx={{ my: 1 }} />
											{navBarLeftLinks.map((item) => (
												<MenuItem
													key={item?.id}
													onClick={toggleDrawer(
														false,
													)}
													component={RouterLink}
													to={item?.pathname}
												>
													{item?.text}
												</MenuItem>
											))}
											{navBarLeftLinks?.length > 0 && (
												<Divider sx={{ my: 3 }} />
											)}

											{navBarRightLink.map((item) => (
												<MenuItem
													key={item?.id}
													onClick={toggleDrawer(
														false,
													)}
												>
													<Button
														color="primary"
														variant="outlined"
														fullWidth
														onClick={item?.onClick}
													>
														{item?.text}
													</Button>
												</MenuItem>
											))}
										</Box>
									</Drawer>
								</Box>
							</StyledToolbar>
						</Container>
					</AppBar>
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export default NavBar;
