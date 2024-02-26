import { Box, Typography, styled } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ReportIcon from "@mui/icons-material/Report";

const StyledGridOverlay = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%"
}));
  
export const CustomNoRowsOverlay: React.FC<{ message: string; statusError: number }> = ({ message, statusError }) => (
	<StyledGridOverlay>
		{ 
			statusError !== 200 ?
				<>
					<ReportIcon color="error" sx={{ fontSize: 60 }} />
					<Box sx={{ mt: 1 }}>
						<Typography variant="body2">
						Qualcosa è andato storto
						</Typography>
					</Box>
				</>
				: <>
					<ReportProblemIcon color="warning" sx={{ fontSize: 60 }} />
					<Box sx={{ mt: 1 }}>
						<Typography variant="body2">
							{message}
						</Typography>
					</Box>
				</>
		}
	</StyledGridOverlay>
);