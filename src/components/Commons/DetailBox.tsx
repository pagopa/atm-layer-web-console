import { Box, Grid, Typography, useTheme } from "@mui/material";
import formatValues from "../../utils/formatValues";
import BreadCrumb from "../NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../NavigationComponents/BreadCrumbMapper";

type Prop = {
	detail: any;
};

const DetailBox = ({ detail }: Prop) => {

	const theme = useTheme();
	const { formatDateToString } = formatValues();

	return (
		<>
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
							{detail.fileName}
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
						{detail.functionType}
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Nome file:</Typography>
					</Grid>
					<Grid item xs={4}>
						{detail.fileName}
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Stato:</Typography>
					</Grid>
					<Grid item xs={4}>
						{detail.status}
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Versione:</Typography>
					</Grid>
					<Grid item xs={4}>
						{detail.modelVersion}
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Data creazione:</Typography>
					</Grid>
					<Grid item xs={4}>
						{formatDateToString(detail.createdAt)}
					</Grid>
					<Grid item xs={2}>
						<Typography variant="body1" fontWeight={"bold"}>Data ultima modifica:</Typography>
					</Grid>
					<Grid item xs={4}>
						{formatDateToString(detail.lastUpdatedAt)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default DetailBox;
