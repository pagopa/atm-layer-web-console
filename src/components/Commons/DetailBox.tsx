import { Box, Grid, Typography, useTheme } from "@mui/material";
import formatValues from "../../utils/formatValues";

type Prop = {
	detail: any;
	fields: Array<{ label: string; value: string; format?: (value: any) => string }>;
	detailTitle: string;
};

const DetailBox = ({ detail, fields, detailTitle }: Prop) => {

	const theme = useTheme();

	return (
		<>
			<Box mb={2}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Box p={1}>
							<Typography variant="h5" textAlign="center" noWrap>
								{detailTitle}
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
					{fields.map(({ label, value, format }) => (
						<>
							<Grid item xs={2}>
								<Typography variant="body1" fontWeight={"bold"}>{label}:</Typography>
							</Grid>
							<Grid item xs={4}>
								{format ? format(detail[value]) : detail[value]}
							</Grid>
						</>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default DetailBox;
