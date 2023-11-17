import { useTheme } from "@mui/material";
import { Typography, Box } from "@mui/material";


export const Header = () => {
	const frontend_url = process.env.REACT_APP_URL_FE;
	const theme = useTheme();
	return (
		<Box
			display="flex"
			alignItems="center"
			
			px={2}
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				backgroundColor: theme.palette.background.paper,
				minHeight: "72px",
			}}
		>
			<Box
				display="flex"
				alignItems="center"
				mr={2}
			>
				 <img
					src={frontend_url + "/static/media/icons/icon-48x48.png"}
					alt="Logo"
				/>
			</Box>
			<Box display="flex">
				<Typography
					color={theme.colorVariant?.main}
					variant="body2"
					noWrap
				>
      Test
				</Typography>
			</Box>

			<Box
				display="flex"
				justifyContent="flex-end"
				ml={"auto"}
			>
				<Typography
					color={theme.colorVariant?.main}
					variant="body2"
					noWrap
				>
      Servizi di pubblica utilità
				</Typography>
			</Box>
		</Box>

	);};