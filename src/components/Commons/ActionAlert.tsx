import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ROUTES from "../../routes";

type Props = {
    openSnackBar?: boolean;
    severity?: any;
    message?: string;
	title?: string;
};

export const ActionAlert = ({openSnackBar, severity, message, title}:Props) => {
	const navigate = useNavigate();
	return(
		
		<Box my={2}>
			{openSnackBar === true &&
				<Alert severity={severity} onClose={() => navigate(ROUTES.BPMN)}>
					<AlertTitle>
						{title}
					</AlertTitle>
					{message}
				</Alert>
			}
		</Box>
		
	);
};