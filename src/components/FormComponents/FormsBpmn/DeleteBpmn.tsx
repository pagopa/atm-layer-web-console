import React, { forwardRef, useContext } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { generatePath } from "react-router-dom";
import fetchDeleteBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmn";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE } from "../../../commons/endpoints";



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

export const DeleteBpmn = ({ open, setOpen }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const handleSubmit = async (e: React.FormEvent) => {

		try {
			const response = await fetchDeleteBpmn({ abortController, URL: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
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

export default DeleteBpmn;
