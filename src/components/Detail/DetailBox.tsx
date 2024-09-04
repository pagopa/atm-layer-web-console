import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import BoxPageLayout from "../../pages/Layout/BoxPageLayout";
import { translatePeriodToFrontend } from "../Commons/Commons";

type Prop = {
	detail: any;
	fields: Array<{ label: string; value: string; format?: (value: any) => string }>;
	detailTitle: string;
};

const DetailBox = ({ detail, fields, detailTitle }: Prop) => {

	const getValue = (format: any | undefined, detail: any, value: any) => {
		if (format) {
			return format(detail[value]);
		} else {
			const extractedValue = detail[value];
			if (value === "period") {
				return translatePeriodToFrontend(detail[value]);
			}
			return detail[value];
		}
	};

	const theme = useTheme();

	return (
		<>
			<Box mt={2}>
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
			{/* <Box my={2}  sx={{border:"1px solid" + theme.palette.primary.main}}> */}
			<BoxPageLayout shadow={true} px={0} mx={4} my={3}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box bgcolor={theme.palette?.primary?.main} py={1} px={2}>
							<Typography variant="h6" fontWeight={"bold"} color={"white"}>
								{detail.fileName || detail.denomination}
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Box p={2}>
					<Grid container spacing={2}>
						{fields.map(({ label, value, format }) => (
							<Grid item xs={4} key={label}>
								<Box display={"flex"}>
									<Typography variant="body2" >{label}: &nbsp;</Typography>
									<Tooltip title= {getValue(format, detail, value)}>
										<Typography variant="body1" ml={1} style={{ overflowWrap: "anywhere" }}>{getValue(format, detail, value)}</Typography>
									</Tooltip>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</BoxPageLayout>
		</>
	);
};

export default DetailBox;
