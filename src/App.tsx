import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Router from './router';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

export default function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box
				id="app"
				sx={(theme) => ({
					width: '100%',
					height: '100%',
					backgroundRepeat: 'no-repeat',

					backgroundImage:
						'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
					...theme.applyStyles('dark', {
						backgroundImage:
							'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
					}),
					p: 2,
				})}
			>
				<Router />
			</Box>
		</ThemeProvider>
	);
}
