import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { Ctx } from "../DataContext";
import formatValues from "../utils/formatValues";
import ROUTES from "../routes";
import BoxPageLayout from "./Layout/BoxPageLayout";
import GoBackButton from "./ReusableComponents/GoBackButton";


const DetailPage = () => {
	const theme = useTheme();
	const { formatDateToString } = formatValues();
	const { recordParams } = useContext(Ctx);

	return (
		<>
			<Box>
				<GoBackButton route={ROUTES.BPMN} />
			</Box>
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
					<Grid item xs={12}>
						<Box bgcolor={theme.palette?.primary?.main} p={1}>
							<Typography variant="h6" fontWeight={"bold"} color={"white"}>
								{recordParams.fileName} Versione: {recordParams.modelVersion}
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
							{recordParams.functionType}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body1" fontWeight={"bold"}>Nome file:</Typography>
						</Grid>
						<Grid item xs={4}>
							{recordParams.fileName}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body1" fontWeight={"bold"}>Stato:</Typography>
						</Grid>
						<Grid item xs={4}>
							{recordParams.status}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body1" fontWeight={"bold"}>Versione:</Typography>
						</Grid>
						<Grid item xs={4}>
							{recordParams.modelVersion}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body1" fontWeight={"bold"}>Data creazione:</Typography>
						</Grid>
						<Grid item xs={4}>
							{formatDateToString(recordParams.createdAt)}
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body1" fontWeight={"bold"}>Data ultima modifica:</Typography>
						</Grid>
						<Grid item xs={4}>
							{formatDateToString(recordParams.lastUpdatedAt)}
						</Grid>
					</Grid>
				</Box>
			</BoxPageLayout>
		</>
	);
};

export default DetailPage;
