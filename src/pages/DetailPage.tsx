import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Container} from "@mui/system";
import { useEffect, useState } from "react";

const DetailPage = () => {
	const theme = useTheme();

	return (
		<Box position="static" display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
			<Typography variant="h2">
				Pagina di Dettaglio
			</Typography>
			<Container style={{ display: "flex", alignItems: "center", border:`solid 1px ${theme.palette.divider}`, padding:"24px", margin:"24px 0px"}}>
				<Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
					<Grid item xs={2}>
						<Typography variant="body1">
									Tipo Funzione:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">
									Nome file:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">
									Stato:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">
									Versione:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">
									Data creazione:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1">
									Data ultima modifica:
						</Typography>
					</Grid>
					<Grid item xs={4}>
							placeholder
					</Grid>
				
				</Grid>
			</Container>
		</Box>
	);

};

export default DetailPage;