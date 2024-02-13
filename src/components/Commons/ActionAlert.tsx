import { Alert, AlertTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import React from "react";
import ROUTES from "../../routes";
import { DELETE_ASSOCIATION } from "../../commons/constants";

type Props = {
	openSnackBar?: boolean;
	severity?: any;
	message?: string;
	title?: string;
	type?: string;
	errorCode?: string;
	handleSwitchAssociationFetch?: () => Promise<void>;
};

export const ActionAlert = ({ openSnackBar, severity, message, title, type, errorCode, handleSwitchAssociationFetch }: Props) => {
	
	const navigate = useNavigate();
	const conditionalReload = () => {
		if (type === DELETE_ASSOCIATION) {
			window.location.reload();
		} else {
			navigate(ROUTES.BPMN);
		}
	};

	return (

		<Box my={2}>
			{openSnackBar === true &&
				<Alert severity={severity} onClose={conditionalReload}>
					<AlertTitle>
						{title}
					</AlertTitle>
					{errorCode && errorCode === "ATMLM_4000047" ?
						<React.Fragment>
							{message + ", vuoi sostiuire l'associazione per questa banca?"}
							{<p><Button onClick={handleSwitchAssociationFetch} color="error">Sotituisci</Button></p>}
						</React.Fragment>
						: message
					}
				</Alert>
			}
		</Box>

	);
};