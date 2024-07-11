import { SetStateAction, useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar, resetErrors } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_BANK, DELETE_BANK, MAX_LENGHT_LARGE, UPDATE_BANK } from "../../../commons/constants";
import { BANKS_CREATE, BANKS_DELETE, BANKS_UPDATE } from "../../../commons/endpoints";

type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	setMessage: React.Dispatch<SetStateAction<string>>;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

const ModalBank = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";

	const initialValues = {
		acquirerId: "",
		denomination: "",
		rateLimit: ""
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
		setErrors(initialValues);
		setFormData(initialValues);
	};


	const validateForm = (isCreate: boolean) => {
		const newErrors = {
			acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
			denomination: formData.denomination ? "" : "Campo obbligatorio",
			rateLimit: formData.rateLimit ? "" : "Campo obbligatorio"
		};
	
		setErrors(newErrors);
	
		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);

		
	};

	useEffect(() => {
		if (open && type === UPDATE_BANK) {
			setFormData({
				acquirerId: recordParams.acquirerId,
				denomination: recordParams.denomination,
				rateLimit: recordParams.rateLimit,
			});
			setErrors(initialValues);
		} else if (open && type === CREATE_BANK) {
			setFormData(initialValues);
			setErrors(initialValues);
		}
	}, [open]);

	const content = getTextModal(type);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);
		switch (type) {
		case DELETE_BANK: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BANKS_DELETE, { acquirerId: recordParams.acquirerId}), method: "POST", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				// window.location.reload();
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case CREATE_BANK: {
			if (validateForm(true)) {
				const postData = {
					acquirerId: formData.acquirerId,
					denomination: formData.denomination,
					rateLimit: formData.rateLimit
				};
				try {
					const response = await fetchRequest({ urlEndpoint: BANKS_CREATE, method: "POST", abortController, body: postData })();
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
		case UPDATE_BANK: {
			if (validateForm(false)) {
				const putData = {
					denomination: formData.denomination,
					rateLimit: formData.rateLimit
				};
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(BANKS_UPDATE, { acquirerId: recordParams.acquirerId }), method: "PUT", abortController, body: putData })();
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
			
			<Grid sx={{px: 2}}>
				{
					(type === CREATE_BANK || type === UPDATE_BANK) &&
                	<><Grid xs={5} item my={1}>
                		<TextField
                			fullWidth
                			id="acquirerId"
                			name="acquirerId"
                			label={"ID Banca"}
                			placeholder={"ID"}
                			size="small"
                			value={ formData.acquirerId }
                			onChange={handleChange}
                			error={Boolean(errors.acquirerId)}
                			helperText={errors.acquirerId}
                			inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-id-test", readOnly: type === UPDATE_BANK }} />
                	</Grid><Grid xs={5} item my={1}>
                		<TextField
                			fullWidth
                			id="denomination"
                			name="denomination"
                			label={"Nome Banca"}
                			placeholder={"nome"}
                			size="small"
                			value={ formData.denomination }
                			onChange={handleChange}
                			error={Boolean(errors.denomination)}
                			helperText={errors.denomination}
                			inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-denomination-test" }} />
                	</Grid><Grid xs={5} item my={1}>
                		<TextField
                			fullWidth
                			id="rateLimit"
                			name="rateLimit"
                			label={"Rate Limite"}
                			placeholder={"12345"}
                			size="small"
                			value={formData.rateLimit}
                			onChange={handleChange}
                			error={Boolean(errors.rateLimit)}
                			helperText={errors.rateLimit}
                			inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-rate-test" }} />
                	</Grid></>
                
				}
			</Grid>
		</ModalTemplate>
	);
};

export default ModalBank;