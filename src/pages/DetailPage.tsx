import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ctx } from "../DataContext";
import formatValues from "../utils/formatValues";
import BreadCrumb from "../components/NavigationComponents/Breadcrumb";
import ROUTES from "../routes";
import BoxPageLayout from "./Layout/BoxPageLayout";


const DetailPage = () => {
	const theme = useTheme();
	const { formatDateToString } = formatValues();
	const { recordParams } = useContext(Ctx);
	const { bpmnId } = useParams();
	const navigate = useNavigate();

	const breadComponent = [
		<Typography key="1" color="text.primary">
			 <Link underline="hover" key="1" color="inherit"  onClick={() => navigate(ROUTES.HOME)} sx={{ cursor: "pointer" }}>Home</Link>
		</Typography>,
		<Typography key="2" color="text.primary">
			<Link underline="hover" key="1" color="inherit" onClick={() => navigate(ROUTES.BPMN)} sx={{ cursor: "pointer" }}>Risorse di processo</Link>
		</Typography>,
		<Typography key="3" color="primary">
			Dettaglio risorsa di processo
		</Typography>
	];

	return (
		<BoxPageLayout px={10}>
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
	);
};

export default DetailPage;
