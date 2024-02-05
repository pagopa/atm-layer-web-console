import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formatValues from "../../utils/formatValues";
import { Ctx } from "../../DataContext";
import ROUTES from "../../routes";
import BreadCrumb from "../NavigationComponents/Breadcrumb";


const DetailBox = () => {
	const theme = useTheme();
	const { formatDateToString } = formatValues();
	const { recordParams } = useContext(Ctx);
	const { bpmnId } = useParams();
	const navigate = useNavigate();

	const breadComponent = [
		<Typography key="1" color="text.primary">
			 Home
		</Typography>,
		<Typography key="2" color="text.primary">
			Risorse di processo
		</Typography>,
		<Typography key="3" color="primary">
			Dettaglio risorsa di processo
		</Typography>
	];

	return (
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
				<BreadCrumb breadcrumb={breadComponent} mb={"4px"}/>
			</Box>
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
							{recordParams.fileName}
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
		</>
	);
};

export default DetailBox;
