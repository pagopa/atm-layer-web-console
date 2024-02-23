import { Box, styled } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const StyledGridOverlay = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%"
}));
  
export const CustomNoResultsOverlay: React.FC<{ message: string; statusError: number }> = ({ message, statusError }) => (
	<StyledGridOverlay>
		<ReportProblemIcon color="warning" sx={{ fontSize: 60 }} />	
		<Box sx={{ mt: 1 }}>{statusError !== 200 ? "Al momento il server non è raggiungibile..." : message}</Box>
	</StyledGridOverlay>
);