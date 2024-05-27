import { SetStateAction, useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { Grid, Select, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar, resetErrors } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_USER, DELETE_USER, MAX_LENGHT_LARGE, UPDATE_USER } from "../../../commons/constants";
import { CREATE_USERS, DELETE_USERS, UPDATE_USERS } from "../../../commons/endpoints";
import MultiSelect from "../MultiSelect";

type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	setMessage: React.Dispatch<SetStateAction<string>>;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

const ModalUsers = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParamsUser");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";

	const initialValues = {
		userId: "",
		profileIds: "",
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

	const handleClose = () => {
		setOpen(false);
		// Reset errors when modal is closed
		setErrors(initialValues);
	};


	const validateForm = (isCreate: boolean) => {
		const newErrors = isCreate ? {
			name: formData.userId ? "" : "Campo obbligatorio",
			value: formData.profileIds ? "" : "Campo obbligatorio",
		} : {
			value: formData.profileIds ? "" : "Campo obbligatorio",
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
		case DELETE_USER: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(DELETE_USERS, { userId: recordParams.userId}), method: "DELETE", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				window.location.reload();
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case CREATE_USER: {
			if (validateForm(true)) {
				const postData = {
					name: formData.userId,
					value: formData.profileIds,
				};
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(CREATE_USERS, { name: recordParams.name }), method: "POST", abortController, body: postData })();
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
		case UPDATE_USER: {
			if (validateForm(false)) {
				// const postData = {
				// 	name: recordParams.name,
				// 	value: formData.value,
				// };
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(UPDATE_USERS, { name: recordParams.name, value: formData.profileIds }), method: "PUT", abortController })();
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
			handleClose={handleClose}
			loading={loading}
		>
			{type === CREATE_USER &&
			<Grid sx={{px: 2}}>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="userId"
						name="userId"
						label={"Email utente"}
						placeholder={"utente@pagopa.com"}
						size="small"
						value={formData.userId}
						onChange={handleChange}
						error={Boolean(errors.name)}
						helperText={errors.name}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test" }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<MultiSelect
					/>
				</Grid>
			</Grid>
			}
			{type === UPDATE_USER &&
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
						value={formData.profileIds}
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

export default ModalUsers;