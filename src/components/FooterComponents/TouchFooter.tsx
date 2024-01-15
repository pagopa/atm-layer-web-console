import { Box, Button, Grid, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
    backButton: () => void;
	handleClick?: () => void;
	continueButton?: string; 
};

export const TouchFooter = ({ backButton, handleClick, continueButton }: Props) => {
	const theme=useTheme();
	return(
		<Grid
			container
			ml={theme.spacing(3)}
			gap={theme.spacing(3)}
		>
			<Grid item xs={3} textAlign="start">
				<Button
					color="primary"
					size="medium"
					startIcon={<ArrowBackIcon />}
					variant="outlined"
					fullWidth
					onClick={backButton}
				>
                    Indietro
				</Button>
			</Grid>
			<Grid item xs={2} textAlign="start">
				<Button
					color="error"
					size="medium"
					startIcon={<LogoutIcon />}
					variant="outlined"
					fullWidth
					onClick={() => console.log("Bottone")}
				>
                    Esci
				</Button>
			</Grid>
			 {
				continueButton && (
					<Grid item xs={6} textAlign="end">
						<Button
							color="primary"
							size="medium"
							variant="contained"
							sx={{width: theme.spacing(20)}}
							onClick={handleClick}
						>
							{continueButton}
						</Button>
					</Grid>
				)
			}
		</Grid>
	);
};