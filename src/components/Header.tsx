import { AppBar, useTheme } from "@mui/material";
import { Typography, Box } from "@mui/material";

type HeaderProps = {
    bankTitle?: string;
    bankLogo: string;
	serviceDescription: string;
};

export const Header = ({
	bankTitle,
	bankLogo,
	serviceDescription
}: HeaderProps) => {
	const theme = useTheme();
	return (
		<AppBar position="static" elevation={0} sx={{backgroundColor: theme.palette.background.paper}}>
			<Box display="flex" 
				alignItems="center" 
				justifyContent="space-between"	
				px={2}
				sx={{
					borderBottom: 1,
					borderColor: "divider",
					minHeight: "72px",
				}}
			>
				<Box display="flex" alignItems="center">

					<Box display="flex" alignItems="center" mr={2}>
				 <img
							src={bankLogo}
							alt="Logo"
							style={{maxHeight:"45px"}}
						/>
					</Box>
					<Box display="flex" alignItems="center">
						<Typography variant="body1" noWrap fontWeight={theme.typography.h6.fontWeight}>
							{bankTitle}
						</Typography>
					</Box>
				</Box>
				<Box display="flex" alignItems="center">
					<Typography
						variant="body1"
						noWrap
					>
						{serviceDescription}
					</Typography>
				</Box>
			</Box>
		</AppBar>
	);};