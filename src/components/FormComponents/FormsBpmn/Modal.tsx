import React, { SetStateAction, forwardRef, useContext } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { generatePath } from "react-router-dom";
import fetchDeleteBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmn";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE, BPMN_DEPLOY, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";
import fetchDeleteAssociatedBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmnAssociated";
import { DELETE, DELETE_ASSOCIATION, DEPLOY } from "../../../commons/constants";
import { getQueryString } from "../../../utils/Commons";


type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openSnackBar?: boolean;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
    severity?: any;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
    message?: string;
	setMessage: React.Dispatch<SetStateAction<string>>;
	title?: string;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalBpmn = ({ type, open, setOpen, openSnackBar, setOpenSnackBar, severity, setSeverity, message, setMessage, title, setTitle }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const handleSnackbar = (success: boolean) => {
		if (success) {
			setMessage("Operazione riuscita");
			setSeverity("success");
			setTitle("Successo");
		} else {
			setMessage("Operazione fallita");
			setSeverity("error");
			setTitle("Errore");
		}
		setOpenSnackBar(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {
		case DELETE: {
			try {
				const response = await fetchDeleteBpmn({ abortController, URL: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);
				}else{
					setOpen(false);
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
			}
			break;
		}
		case DEPLOY: {
			try {
				const response = await fetchDeployBpmn({ abortController, URL: generatePath(BPMN_DEPLOY, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);
				}else{
					setOpen(false);
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
			}
			break;
		}
		case DELETE_ASSOCIATION: {
			const recordParamsAssociated = JSON.parse(localStorage.getItem("recordParamsAssociated") ?? "");
			const baseUrl = generatePath(DELETE_ASSOCIATE_BPMN, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
			const URL = `${baseUrl}?acquirerId=${recordParamsAssociated.acquirerId}`;
			const filterValues = { branchId: recordParamsAssociated.branchId, terminalId: recordParamsAssociated.terminalId };
			const url = getQueryString(URL, filterValues, DELETE_ASSOCIATION);

			try {
				const response = await fetchDeleteAssociatedBpmn({ abortController, url })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					window.location.reload();
				}
				setOpen(false);
			} catch (error) {
				console.error("ERROR", error);
			}
			break;
		}

		default: return;
		}

	};

	return (
		<>
			{
				type === "DELETE" && 
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth={"sm"}
			>
				<DialogTitle>
					Cancellazione risorsa di processo
				</DialogTitle>
				<Divider />
				<Box py={2}>
					<DialogContent>
						<DialogContentText>
							Sei sicuro di voler cancellare questa risorsa di proccesso?
						</DialogContentText>
					</DialogContent>
				</Box>
				<DialogActions >
					<Box display={"flex"} flexDirection={"row"} p={2}>
						<Box mr={2}>
							<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
						</Box>
						<Box>
							<Button variant={"contained"} onClick={handleSubmit}>Conferma</Button>
						</Box>
					</Box>
				</DialogActions>
			</Dialog>
			}
			{type === "DEPLOY" &&
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={() => setOpen(false)}
					fullWidth
					maxWidth={"sm"}
				>
					<DialogTitle>
						Rilascio risorsa di processo
					</DialogTitle>
					<Divider />
					<Box py={2}>
						<DialogContent>
							<DialogContentText>
								Sei sicuro di voler rilasciare questa risorsa di proccesso?
							</DialogContentText>
						</DialogContent>
					</Box>
					<DialogActions >
						<Box display={"flex"} flexDirection={"row"} p={2}>
							<Box mr={2}>
								<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
							</Box>
							<Box>
								<Button variant={"contained"} onClick={handleSubmit}>Conferma</Button>
							</Box>
						</Box>
					</DialogActions>
				</Dialog>
			}
			{type === DELETE_ASSOCIATION &&
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={() => setOpen(false)}
					fullWidth
					maxWidth={"sm"}
				>
					<DialogTitle>
						Eliminazione Associazione
					</DialogTitle>
					<Divider />
					<Box py={2}>
						<DialogContent>
							<DialogContentText>
								Sei sicuro di voler eliminare questa associazione?
							</DialogContentText>
						</DialogContent>
					</Box>
					<DialogActions >
						<Box display={"flex"} flexDirection={"row"} p={2}>
							<Box mr={2}>
								<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
							</Box>
							<Box>
								<Button variant={"contained"} onClick={handleSubmit}>Conferma</Button>
							</Box>
						</Box>
					</DialogActions>
				</Dialog>
			}
		</>
	);
};

export default ModalBpmn;
