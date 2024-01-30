import { Box, Grid, Typography, useTheme } from "@mui/material";
import BoxPageLayout from "./Layout/BoxPageLayout";

const DetailPage = () => {
	const theme = useTheme();
	console.log("QUIIII",theme);

	return (
		<BoxPageLayout px={10}>
			<Box mb={2}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Box p={1}>
							<Typography variant="h5" textAlign="center" noWrap>
								Dettaglio risorsa di processo
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12} >
					<Box bgcolor={theme.palette?.primary?.main} p={1}>
						<Typography variant="h6" fontWeight={"bold"} color={"white"} >
						NomeFile  Versione:nVers
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Box p={2}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Tipo Funzione:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Nome file:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Stato:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Versione:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Data creazione:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Data ultima modifica:</Typography>
					</Grid>
					<Grid item xs={4}>
          			placeholder
					</Grid>
				</Grid>
			</Box>
		</BoxPageLayout>
	);
};

export default DetailPage;
