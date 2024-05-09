import { SetStateAction, useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar, resetErrors } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_VARIABLES, DELETE_VARIABLES, UPDATE_VARIABLES } from "../../../commons/endpoints";
import { CREATE_VARIABLE, DELETE_VARIABLE, MAX_LENGHT_LARGE, UPDATE_VARIABLE } from "../../../commons/constants";

type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	setMessage: React.Dispatch<SetStateAction<string>>;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

const ModalVariable = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParamsVariable");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";

	const initialValues = {
		name: "",
		value: "",
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		resetErrors(errors, setErrors, e.target.name);
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const validateForm = (isCreate: boolean) => {
		const newErrors = isCreate ? {
			name: formData.name ? "" : "Campo obbligatorio",
			value: formData.value ? "" : "Campo obbligatorio",
		} : {
			value: formData.value ? "" : "Campo obbligatorio",
		};
	
		setErrors(newErrors);
	
		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);

		
	};

	useEffect(() => {
		setFormData(initialValues);
	  }, []);


	const content = getTextModal(type);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);
		switch (type) {
		case DELETE_VARIABLE: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(DELETE_VARIABLES), method: "DELETE", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case CREATE_VARIABLE: {
			if (validateForm(true)) {
				const postData = {
					name: formData.name,
					value: formData.value,
				};
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(CREATE_VARIABLES, { name: recordParams.name }), method: "POST", abortController, body: postData })();
					setLoading(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
					window.location.reload();
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} else {
				setLoading(false);
			}
			break;
		}
		case UPDATE_VARIABLE: {
			if (validateForm(false)) {
				// const postData = {
				// 	name: recordParams.name,
				// 	value: formData.value,
				// };
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(UPDATE_VARIABLES, { name: recordParams.name, value: formData.value }), method: "PUT", abortController })();
					setLoading(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
					window.location.reload();
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} else {
				setLoading(false);
			}
			break;
		}
		default: { return null; }
		}

	};

	return (
		<ModalTemplate
			titleModal={content?.titleModal}
			contentText={content?.contentText}
			open={open}
			setOpen={setOpen}
			handleSubmit={handleSubmit}
			loading={loading}
		>
			{type === CREATE_VARIABLE &&
			<Grid sx={{px: 2}}>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="name"
						name="name"
						label={"Nome"}
						placeholder={"nome"}
						size="small"
						value={formData.name}
						onChange={handleChange}
						error={Boolean(errors.name)}
						helperText={errors.name}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-name-test" }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="value"
						name="value"
						label={"Valore"}
						placeholder={"valore"}
						size="small"
						value={formData.value}
						onChange={handleChange}
						error={Boolean(errors.value)}
						helperText={errors.value}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-value-test" }}
					/>
				</Grid>
			</Grid>
			}
			{type === UPDATE_VARIABLE &&
			<Grid sx={{px: 2}}>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="name"
						name="name"
						label={"Nome"}
						placeholder={"nome"}
						size="small"
						value={recordParams.name}
						onChange={handleChange}
						error={Boolean(errors.name)}
						helperText={errors.name}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-name-test", readOnly: true }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="value"
						name="value"
						label={"Valore"}
						placeholder={"valore"}
						size="small"
						value={formData.value}
						onChange={handleChange}
						error={Boolean(errors.value)}
						helperText={errors.value}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-value-test" }}
					/>
				</Grid>
			</Grid>
			}			
		</ModalTemplate>
	);
};

export default ModalVariable;