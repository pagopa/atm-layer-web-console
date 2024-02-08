import React, { forwardRef, useContext/* , useState */ } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
// import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";
import { BPMN_DEPLOY } from "../../../commons/endpoints";

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const DeployBpmn = ({ open, setOpen }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const handleSubmit = async (e: React.FormEvent) => {

		try {
			const response = await fetchDeployBpmn({ abortController, URL: generatePath(BPMN_DEPLOY, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
			if (response?.success) {
				console.log("response", response);
				setOpen(false);
			}
			setOpen(false);
		} catch (error) {
			console.error("ERROR", error);
		}
	};


	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={() => setOpen(false)}
			fullWidth
			maxWidth={"sm"}
		>
			<DialogTitle>Deploy Risorsa di processo</DialogTitle>
			<Divider/>
			<Box py={2}>
				<DialogContent>
					<DialogContentText>
					Sei sicuro di voler deployare questa risorsa di proccesso?
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
	);
};

export default DeployBpmn;
