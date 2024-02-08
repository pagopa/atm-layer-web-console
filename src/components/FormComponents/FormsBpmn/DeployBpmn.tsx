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
};

export default DeployBpmn;
