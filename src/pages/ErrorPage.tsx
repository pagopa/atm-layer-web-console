import { Box, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import BoxPageLayout from "./Layout/BoxPageLayout";

const ErrorPage = () => (
	<BoxPageLayout >
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"80vh"}> 
			<Box >
				<ReportIcon color="error" sx={{ fontSize: 100 }} />
			</Box>
			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
				<Typography variant="h6">
                    Non sei autorizzato ad accedere a questa sezione
				</Typography>
				<Typography >
                    Contatta l&apos;amministratore di utenze e permessi
				</Typography>
			</Box>
		</Box>
	</BoxPageLayout>
);


export default ErrorPage;
