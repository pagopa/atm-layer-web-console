import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ROUTES from "../../routes";
import { DELETE_ASSOCIATION } from "../../commons/constants";

type Props = {
	openSnackBar?: boolean;
	severity?: any;
	message?: string;
	title?: string;
	type?: string;
};

export const ActionAlert = ({ openSnackBar, severity, message, title, type }: Props) => {
	const navigate = useNavigate();
	return(

		<Box my={2}>
			{openSnackBar === true &&
				<Alert severity={severity} onClose={() => {
					if (type === DELETE_ASSOCIATION) {
						window.location.reload();
					} else {
						navigate(ROUTES.BPMN);
					}
				}}>
					<AlertTitle>
						{title}
					</AlertTitle>
					{message}
				</Alert>
			}
		</Box>
		
	);
};