import { Box, Grid, Typography, useTheme } from "@mui/material";
import BoxPageLayout from "../../pages/Layout/BoxPageLayout";

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
			{/* <Box my={2}  sx={{border:"1px solid" + theme.palette.primary.main}}> */}
			<BoxPageLayout shadow={true} px={0} mx={4} my={3}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box bgcolor={theme.palette?.primary?.main} py={1} px={2}>
							<Typography variant="h6" fontWeight={"bold"} color={"white"}>
								{detail.fileName}
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
									<Typography variant="body1" style={{ overflowWrap: "anywhere" }}>{format ? format(detail[value]) : detail[value]}</Typography>
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
