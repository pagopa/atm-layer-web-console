import { SetStateAction, SyntheticEvent, useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar, resetErrors } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_USER, DELETE_USER, MAX_LENGHT_LARGE, UPDATE_USER } from "../../../commons/constants";
import { CREATE_USERS, DELETE_USERS, UPDATE_USERS } from "../../../commons/endpoints";
import MultiSelect from "../MultiSelect";
import formatValues from "../../../utils/formatValues";

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
	const { extractDescriptionsAsArray } = formatValues();
	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParamsUser");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";

	const initialValues = {
		userId: "",
		profileIds: [] as Array<string>,
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData((prevFormData) => ({
			...prevFormData,
			userId: e.target.value,
		}));
	};

	const handleMultiSelectChange = (event: SyntheticEvent<Element, Event>, value: Array<string>) => {
		resetErrors(errors, setErrors, "profileIds");
		setFormData((prevFormData) => ({
			...prevFormData,
			profileIds: value,
		}));
	};

	const handleClose = () => {
		setOpen(false);
		setErrors(initialValues);
		setFormData(initialValues);
	};

	const validateForm = (isCreate: boolean) => {
		const newErrors = isCreate
			? {
				userId: formData.userId ? "" : "Campo obbligatorio",
				profileIds: formData.profileIds.length > 0 ? "" : "Campo obbligatorio",
			}
			: {
				profileIds: formData.profileIds.length > 0 ? "" : "Campo obbligatorio",
			};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	useEffect(() => {
		if (open && type === UPDATE_USER) {
			setFormData({
				userId: recordParams.userId,
				profileIds: extractDescriptionsAsArray(recordParams.profiles),
			});
			setErrors(initialValues);
		} else if (open && type === CREATE_USER) {
			setFormData(initialValues);
			setErrors(initialValues);
		}
	}, [open]);

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
					userId: formData.userId,
					profileIds: formData.profileIds,
				};
				try {
					const response = await fetchRequest({ urlEndpoint: CREATE_USERS, method: "POST", abortController, body: postData })();
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
				const postData = {
					profileIds: formData.profileIds,
				};
				console.log(formData, postData);
				try {
					const response = await fetchRequest({ urlEndpoint:generatePath(UPDATE_USERS, { userId: recordParams.userId}), method: "PUT", abortController, body: postData })();
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
						error={Boolean(errors.userId)}
						helperText={errors.userId}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test" }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<MultiSelect
						handleChange={handleMultiSelectChange}
						errors={errors}
						value={formData.profileIds}
					/>
				</Grid>
			</Grid>
			}
			{type === UPDATE_USER &&
			<Grid sx={{px: 2}}>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="userId"
						name="userId"
						label={"Email utente"}
						placeholder={"utente@pagopa.com"}
						size="small"
						value={recordParams.userId}
						onChange={handleChange}
						error={Boolean(errors.userId)}
						helperText={errors.name}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test", readOnly: true }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<MultiSelect handleChange={handleMultiSelectChange}
						errors={errors}		
						value={formData.profileIds}	
					/>
				</Grid>
			</Grid>
			}	
		</ModalTemplate>
	);
};

export default ModalUsers;
