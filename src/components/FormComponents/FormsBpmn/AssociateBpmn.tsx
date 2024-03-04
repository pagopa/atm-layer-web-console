import { Grid, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { ACQUIRER_ID_LENGTH, ASSOCIATE_BPMN, TERMINAL_BRANCH_LENGTH } from "../../../commons/constants";
import formOption from "../../../hook/formOption";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import FormTemplate from "../template/FormTemplate";
import { BPMN_ASSOCIATE_API, UPDATE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";

const AssociateBpmn = () => {

	const { getFormOptions } = formOption();
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const [loadingButton, setLoadingButton] = useState(false);

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
			setLoadingButton(true);
			try {
				const response = await fetchRequest({
					urlEndpoint: generatePath(BPMN_ASSOCIATE_API,
						{
							bpmnId: recordParams?.bpmnId,
							modelVersion: recordParams?.modelVersion
						}
					),
					method: "POST",
					abortController,
					body: formData,
					headers: { "Content-Type": "application/json" }
				})();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if (!response?.success) {
					setErrorCode(response.valuesObj.errorCode);
				} else { setErrorCode(undefined); }
			} catch (error) {
				setLoadingButton(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
	};

	const handleSwitchAssociationFetch = async () => {
		setErrorCode(undefined);
		try {
			const response = await fetchRequest({
				urlEndpoint: generatePath(UPDATE_ASSOCIATE_BPMN,
					{
						bpmnId: recordParams?.bpmnId,
						modelVersion: recordParams?.modelVersion
					}
				),
				method: "PUT",
				abortController,
				body: formData,
				headers: { "Content-Type": "application/json" }
			})();
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
			loadingButton={loadingButton}
		>
			<Grid item xs={12} my={1}>
				<TextField
					inputProps={{ maxLength: ACQUIRER_ID_LENGTH.maxLength, "data-testid": "acquirer-id-test" }}
					fullWidth
					id="acquirerId"
					name="acquirerId"
					label={"ID Banca"}
					placeholder={"01234567890"}
					size="small"
					value={formData.acquirerId}
					onChange={handleChange}
					error={Boolean(errors.acquirerId)}
					helperText={errors.acquirerId}
				/>
			</Grid>
			<Grid item
				xs={12}
				my={2}
				display="flex"

				flexDirection={"row"}
				justifyContent={"flex-start"}
				alignItems={"center"}
			>
				<TextField
					inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH.maxLength, "data-testid": "branch-id-test" }}
					fullWidth
					id="branchId"
					name="branchId"
					label={"ID Filiale"}
					placeholder={"01234567"}
					size="small"
					disabled={branchChecked}
					value={formData.branchId}
					onChange={handleChange}
				/>
				<Stack direction="row" alignItems={"center"} sx={{ pl: "12px" }}>
					<Typography >Tutti</Typography>
					<Switch
						checked={branchChecked}
						onChange={() => {
							setBranchChecked(!branchChecked);
							setFormData({ ...formData, branchId: "" });
						}}
						name="branchIdSwitch"
					/>
				</Stack>
			</Grid>
			<Grid item
				xs={12}
				my={1}
				display="flex"
				flexDirection={"row"}
				justifyContent={"flex-start"}
				alignItems={"center"}
			>
				<TextField
					inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH.maxLength, "data-testid": "terminal-id-test" }}
					fullWidth
					id="terminalId"
					name="terminalId"
					label={"ID Terminale"}
					placeholder={"01234567"}
					size="small"
					disabled={terminalChecked || branchChecked}
					value={formData.terminalId}
					onChange={handleChange}

				/>
				<Stack direction="row" alignItems={"center"} sx={{ pl: "12px" }}>
					<Typography>Tutti</Typography>
					<Switch
						checked={terminalChecked}
						disabled={branchChecked}
						onChange={() => {
							setTerminalChecked(!terminalChecked);
							setFormData({ ...formData, terminalId: "" });
						}}
						name="terminalIdSwitch"
					/>
				</Stack>
			</Grid>
		</FormTemplate>
	);

};

export default AssociateBpmn;
