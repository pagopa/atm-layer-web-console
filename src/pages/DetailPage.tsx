import { Box, Typography } from "@mui/material";

const DetailPage = () => {
	console.log("Detail Page");

	return (
		<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
			<Typography variant="h2">
                Pagina di dettaglio
			</Typography>
		</Box>
	);

};

export default DetailPage;