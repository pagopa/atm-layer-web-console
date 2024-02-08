import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
    openSnackBar: boolean;
    severity: any;
    message: string;
	snackBarVerticalAlign?: boolean;
};

export const ActionAlert = ({openSnackBar, severity, message, snackBarVerticalAlign}:Props) => {
	const navigate = useNavigate();
	return(
		<Snackbar
			open={openSnackBar}
			anchorOrigin={ snackBarVerticalAlign ? { vertical: "top", horizontal: "right" } : undefined}
		>
			<Alert severity={severity} onClose={() => navigate(ROUTES.BPMN)}>
				<AlertTitle>{severity}</AlertTitle>
				{message}
			</Alert>
		</Snackbar>
	);
};