import { Grid, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { ASSOCIATE_BPMN } from "../../../commons/constants";
import formOption from "../../../hook/formOption";
import { handleSnackbar, resetErrors } from "../../../utils/Commons";
import FormTemplate from "../template/FormTemplate";
import fetchAssociateBpmn from "../../../hook/fetch/Bpmn/fetchAssociateBpmn";
import { BPMN_ASSOCIATE } from "../../../commons/endpoints";

const MinimalAssociateBpmn = () => {

	const { getFormOptions } = formOption();
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const initialValues = {
		acquirerId: "",
		branchId: "",
		terminalId: ""
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>({
		acquirerId: "",
	});
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const [branchChecked, setBranchChecked] = useState(true);
	const [terminalChecked, setTerminalChecked] = useState(true);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors = {
			acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};
	const handleSubmit = async (e: React.FormEvent) => {

		const postData = new FormData();
		if (formData?.acquirerId && formData?.branchId && formData?.terminalId) {
			postData.append("acquirerId", formData.acquirerId.trim());
			postData.append("branchId", formData.branchId.trim());
			postData.append("terminalId", formData.terminalId.trim());
		}

		if (validateForm()) {
			// if(newAssociation) {
			try {
				const URL = generatePath(BPMN_ASSOCIATE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
				const response = await fetchAssociateBpmn({ abortController, body: JSON.stringify(formData), url: URL })();

				if (response?.success) {
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} else {
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			// } else {
			// 	try {
			// 		const URL = generatePath(UPDATE_ASSOCIATE_BPMN, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
			// 		const response = await fetchUpdateBpmnAssociated({ abortController, body: JSON.stringify(formData), url: URL })();

			// 		if (response?.success) {
			// 			handleSnackbar(true);
			// 		} else {
			// 			handleSnackbar(false);
			// 		}
			// 	} catch (error) {
			// 		console.error("ERROR", error);
			// 		handleSnackbar(false);
			// 	}
			// }
		}
	};

	return (
		<FormTemplate
			handleSubmit={handleSubmit}
			getFormOptions={getFormOptions(ASSOCIATE_BPMN)}
			openSnackBar={openSnackBar}
			severity={severity}
			message={message}
			title={title}
		>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="acquirerId"
					name="acquirerId"
					label={"ID Banca"}
					placeholder={"ID Banca"}
					size="small"
					value={formData.acquirerId}
					onChange={handleChange}
					error={Boolean(errors.acquirerId)}
					helperText={errors.acquirerId} />
			</Grid>
			<Grid xs={10} item pr={2} my={2}>
				<TextField
					fullWidth
					id="branchId"
					name="branchId"
					label={"ID Filiale"}
					placeholder={"ID Filiale"}
					size="small"
					disabled={branchChecked}
					value={formData.branchId}
					onChange={handleChange}
				/>
			</Grid>
			<Grid xs={2} item my={2}>
				<Stack direction="row" spacing={1} alignItems={"center"}>
					<Typography>Tutti</Typography>
					<Switch checked={branchChecked} onChange={() => { setBranchChecked(!branchChecked); setFormData({ ...formData, branchId: "" }); }} name="branchIdSwitch" />
				</Stack>
			</Grid>
			<Grid xs={10} item pr={2} my={1}>
				<TextField
					fullWidth
					id="terminalId"
					name="terminalId"
					label={"ID Terminale"}
					placeholder={"ID Terminale"}
					size="small"
					disabled={terminalChecked}
					value={formData.terminalId}
					onChange={handleChange}
				/>
			</Grid>
			<Grid xs={2} item my={1}>
				<Stack direction="row" spacing={1} alignItems={"center"}>
					<Typography>Tutti</Typography>
					<Switch checked={terminalChecked} onChange={() => { setTerminalChecked(!terminalChecked); setFormData({ ...formData, terminalId: "" }); }} name="terminalIdSwitch" />
				</Stack>
			</Grid>
		</FormTemplate>
	);

};

export default MinimalAssociateBpmn;
