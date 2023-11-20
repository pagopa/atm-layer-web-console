import { Button, Grid, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
    backButton: () => void;
};

export const TouchFooter = ({ backButton }: Props) => {
   
	const theme = useTheme();
	const borderBottons = { borderRadius: theme.shape.borderRadius, width: "80%" };

	return (
		<Grid container ml={2}>
		    <Grid item xs={2} sx={{ textAlign: "center" }}>
				<Button
					color="primary"
					size="large"
					startIcon={<ArrowBackIcon />}
					variant="outlined"
					sx={borderBottons}
					onClick={backButton}
				>
                Indietro
				</Button>
			</Grid>
			<Grid item xs={1} sx={{ textAlign: "center" }}>
				<Button
					color="error"
					size="large"
					startIcon={<LogoutIcon />}
					variant="outlined"
					sx={borderBottons}
					onClick={() => console.log("Bottone ")}
				>
                    Esci
				</Button>
		    </Grid>
		</Grid>  
	);
};