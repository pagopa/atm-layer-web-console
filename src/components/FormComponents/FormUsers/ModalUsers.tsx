import { SetStateAction, SyntheticEvent, useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { convertStringToProfiles, getProfileDescriptionByProfileArray, getTextModal, handleSnackbar, resetErrors } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_USER, DELETE_USER, MAX_LENGHT_LARGE, mockedProfiles, UPDATE_FIRST_USER, UPDATE_USER } from "../../../commons/constants";
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
	const { abortController, loggedUserInfo } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParamsUser");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const profilesAvailable = mockedProfiles;

	const initialValues = {
		userId: "",
		name: "",
		surname: "",
		profileIds: [] as Array<string>,
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

	const handleMultiSelectChange = (event: SyntheticEvent<Element, Event>, value: Array<string>) => {
		setErrors((prevErrors: { [x: string]: any }) => {
			// eslint-disable-next-line functional/immutable-data
			prevErrors.profileIds = [] as Array<string>;
			return { ...prevErrors };
		});
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
				name: formData.name ? "" : "Campo obbligatorio",
				surname: formData.surname ? "" : "Campo obbligatorio",
				profileIds: formData.profileIds.length > 0 ? "" : "Campo obbligatorio",
			}
			: {
				name: formData.name ? "" : "Campo obbligatorio",
				surname: formData.surname ? "" : "Campo obbligatorio",
				profileIds: formData.profileIds.length > 0 ? "" : "Campo obbligatorio",
			};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	useEffect(() => {
		if (open && (type === UPDATE_USER || type === UPDATE_FIRST_USER)) {
			setFormData({
				userId: recordParams.userId,
				name: recordParams.name,
				surname: recordParams.surname,
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
					name: formData.name,
					surname: formData.surname,
					profileIds: convertStringToProfiles(formData.profileIds, profilesAvailable),
				};
				try {
					const response = await fetchRequest({ urlEndpoint: CREATE_USERS, method: "POST", abortController, body: postData, headers: { "Content-Type": "application/json" } })();
					setLoading(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
					// window.location.reload();
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
		case UPDATE_USER:
		case UPDATE_FIRST_USER: {
			if (validateForm(false)) {
				const postData = {
					userId: formData.userId,
					name: formData.name,
					surname: formData.surname,
					profileIds: convertStringToProfiles(formData.profileIds, profilesAvailable),
				};
				console.log(formData, postData);
				try {
					const response = await fetchRequest({ urlEndpoint:UPDATE_USERS, method: "PUT", abortController, body: postData, headers: { "Content-Type": "application/json" } })();
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
			canOnlyConfirm={type===UPDATE_FIRST_USER ? true : false}
		>
			{ type !== DELETE_USER &&
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
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test", readOnly: type === UPDATE_USER || type === UPDATE_FIRST_USER}}
					/>
				</Grid>
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
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test" }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<TextField
						fullWidth
						id="surname"
						name="surname"
						label={"Cognome"}
						placeholder={"cognome"}
						size="small"
						value={formData.surname}
						onChange={handleChange}
						error={Boolean(errors.surname)}
						helperText={errors.surname}
						inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "userid-test" }}
					/>
				</Grid>
				<Grid xs={5} item my={1}>
					<MultiSelect
						handleChange={handleMultiSelectChange}
						errors={errors}
						value={formData.profileIds}
						names={getProfileDescriptionByProfileArray(profilesAvailable)}
						isFirstUser={type === UPDATE_FIRST_USER ? true : false}
					/>
				</Grid>
			</Grid>
			}
				
		</ModalTemplate>
	);
};

export default ModalUsers;
