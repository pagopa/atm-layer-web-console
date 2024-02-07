import { Alert, Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
    openSnackBar: boolean;
    severity: any;
    message: string;
};

export const ActionAlert = ({openSnackBar, severity, message}:Props) => {
	const navigate = useNavigate();
	return(
		<Snackbar
			open={openSnackBar}
			autoHideDuration={4000}
			onClose={() => navigate(ROUTES.BPMN)}
			sx={{
				position: "static",
			}}
		>
			<Alert severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};