import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import ROUTES from "../../routes";
import { DELETE, DELETE_ASSOCIATION, DELETE_BPMN, DELETE_RES, DELETE_VALUES, DELETE_WR, DEPLOY_VALUES } from "../../commons/constants";

type Props = {
	setOpenSnackBar?: React.Dispatch<React.SetStateAction<boolean>>;
	openSnackBar?: boolean;
	severity?: any;
	message?: string;
	title?: string;
	type?: string;
	errorCode?: string;
	handleSwitchAssociationFetch?: () => Promise<void>;
};

export const ActionAlert = ({ setOpenSnackBar, openSnackBar, severity, message, title, type, errorCode, handleSwitchAssociationFetch }: Props) => {

	const navigate = useNavigate();

	const conditionalReload = () => {
		if (type === DELETE_ASSOCIATION || (type && DEPLOY_VALUES.includes(type))) {
			window.location.reload();
		} else if (type && type === DELETE_BPMN) {
			navigate(ROUTES.BPMN);
		} else if (type && type === DELETE_RES) {
			navigate(ROUTES.RESOURCES);
		} else if (type && type === DELETE_WR) {
			navigate(ROUTES.WORKFLOW_RESOURCES);
		} else if (setOpenSnackBar) {
			setOpenSnackBar(false);
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
						<Typography variant="body1">
							{message + ", vuoi sostiuire l'associazione per questa banca?"}
							{<p><Button onClick={handleSwitchAssociationFetch} color="error">Sotituisci</Button></p>}
						</Typography>
						: <Typography variant="body1">{message}</Typography>
					}
				</Alert>
			}
		</Box>

	);
};