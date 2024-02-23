import { Box, Typography, styled } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

const StyledGridOverlay = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%"
}));
  
export const CustomNoRowsOverlay: React.FC= () => (
	<StyledGridOverlay>
		<ReportIcon color="error" sx={{ fontSize: 60 }} />	
		<Box sx={{ mt: 1 }}>
			<Typography variant="body2">
				Qualcosa è andato storto
			</Typography>
		</Box>
	</StyledGridOverlay>
);