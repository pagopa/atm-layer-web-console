import { Grid, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { ASSOCIATE_BPMN } from "../../../commons/constants";
import formOption from "../../../hook/formOption";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import FormTemplate from "../template/FormTemplate";
import { BPMN_ASSOCIATE_API, UPDATE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";

const AssociateBpmn = () => {

	const { getFormOptions } = formOption();
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const [loading, setLoading] = useState(false);

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
	const [errorCode, setErrorCode] = useState();

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
		if (validateForm()) {
			setLoading(true);
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_ASSOCIATE_API, { bpmnId: recordParams?.bpmnId, modelVersion: recordParams?.modelVersion }), method: "POST", abortController, body: formData, headers: { "Content-Type" : "application/json" } })();
				setLoading(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if (!response?.success) {
					setErrorCode(response.valuesObj.errorCode);
				}else { setErrorCode(undefined);}
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
	};

	const handleSwitchAssociationFetch = async () => {
		setErrorCode(undefined);
		try {
			const response = await fetchRequest({ urlEndpoint: generatePath(UPDATE_ASSOCIATE_BPMN,{ bpmnId: recordParams?.bpmnId, modelVersion: recordParams?.modelVersion }), method: "PUT", abortController, body: formData, headers: { "Content-Type" : "application/json" } })();
			handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
		} catch (error) {
			console.error("ERROR", error);
			handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
			errorCode={errorCode}
			handleSwitchAssociationFetch={handleSwitchAssociationFetch}
			setOpenSnackBar={setOpenSnackBar}
			loading={loading}
		>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="acquirerId"
					name="acquirerId"
					label={"ID Banca"}
					placeholder={"01234"}
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
					placeholder={"098"}
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
					placeholder={"56"}
					size="small"
					disabled={terminalChecked || branchChecked}
					value={formData.terminalId}
					onChange={handleChange}
				/>
			</Grid>
			<Grid xs={2} item my={1}>
				<Stack direction="row" spacing={1} alignItems={"center"}>
					<Typography>Tutti</Typography>
					<Switch checked={terminalChecked} disabled={branchChecked} onChange={() => { setTerminalChecked(!terminalChecked); setFormData({ ...formData, terminalId: "" }); }} name="terminalIdSwitch" />
				</Stack>
			</Grid>
		</FormTemplate>
	);

};

export default AssociateBpmn;
