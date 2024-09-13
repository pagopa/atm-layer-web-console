import { SetStateAction, useContext, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Grid, MenuItem, TextField } from "@mui/material";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar, resetErrors, translatePeriodToBackend, translatePeriodToFrontend } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { ALERT_ERROR, ALERT_SUCCESS, CREATE_BANK, DELETE_BANK, EMPTY_SELECT_VALUE, MAX_LENGHT_LARGE, MAX_LENGTH_MEDIUM, MAX_LENGTH_NUMERIC, MAX_LENGTH_SMALL, quotaPeriodOptions, UPDATE_BANK } from "../../../commons/constants";
import { BANKS_CREATE, BANKS_DELETE, BANKS_UPDATE } from "../../../commons/endpoints";
import ROUTES from "../../../routes";
import { ActionAlert } from "../../Commons/ActionAlert";
import { BankRequest } from "../../../model/BankModel";

type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openSnackBar:boolean;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	severity: string;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	message: string;
	setMessage: React.Dispatch<SetStateAction<string>>;
	title: string;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

const ModalBank = ({ type, open, setOpen, openSnackBar, setOpenSnackBar, severity, setSeverity, message, setMessage, title, setTitle }: Props) => {

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParamsBank");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const navigate = useNavigate();

	const initialValues = {
		acquirerId: "",
		denomination: "",
		limit: "",
		period: null,
		burstLimit: "",
		rateLimit: ""
	};

	const [formData, setFormData] = useState<BankRequest>(initialValues);
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
		setOpenSnackBar(false);
	};


	// eslint-disable-next-line complexity
	const validateForm = (isCreate: boolean) => {
		const newErrors = {
			acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
			denomination: formData.denomination ? "" : "Campo obbligatorio",
			limit: ((formData.limit && (formData.period && formData.period !== EMPTY_SELECT_VALUE)) || (!formData.limit && !(formData.period && formData.period !== EMPTY_SELECT_VALUE))) ? "" : "Indicare sia una quota che il periodo a cui si applica, o eliminare entrambi i campi per non limitare il numero di chiamate",
			period: ((formData.limit && (formData.period && formData.period !== EMPTY_SELECT_VALUE)) || (!formData.limit && !(formData.period && formData.period !== EMPTY_SELECT_VALUE))) ? "" : "Indicare sia una quota che il periodo a cui si applica, o eliminare entrambi i campi per non limitare il numero di chiamate",
			burstLimit: (formData.burstLimit !=="" && Number(formData.burstLimit) === 0 ) ? "Il valore deve essere maggiore di 0" 
				: ((Number(formData.burstLimit) > 0 && Number(formData.rateLimit) > 0) || (!formData.burstLimit && !formData.rateLimit))
					? "" 
					: ((formData.burstLimit && formData.rateLimit) || (!formData.burstLimit && !formData.rateLimit)) ? "" : "Indicare sia un rate che un limite di burst, o eliminare entrambi i campi per non limitare il rate di chiamate",

			rateLimit: (formData.rateLimit !== "" && Number(formData.rateLimit) === 0 ) ? "Il valore deve essere maggiore di 0" 
				: ((Number(formData.burstLimit) > 0 && Number(formData.rateLimit) > 0) || (!formData.burstLimit && !formData.rateLimit))
					? "" 
					: ((formData.burstLimit && formData.rateLimit) || (!formData.burstLimit && !formData.rateLimit)) ? "" : "Indicare sia un rate che un limite di burst, o eliminare entrambi i campi per non limitare il rate di chiamate"
		};
	
		setErrors(newErrors);

	
		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);

		
	};

	// const validateNumericInput = (e: KeyboardEvent) => {
	// 	if ( !(e.ctrlKey && e.key === "a") && !(e.ctrlKey && e.key === "c") && !(e.ctrlKey && e.key === "v") && !(e.ctrlKey && e.key === "x") && !(e.ctrlKey && e.key === "z") 
	// 		&& e.key !== "Clear" && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Enter" 
	// 	&& !(/^[0-9]$/i.test(e.key))) {
	//   e.preventDefault();
	// 	}
	// };

	useEffect(() => {
		if (open && type === UPDATE_BANK) {
			setFormData({
				acquirerId: recordParams.acquirerId,
				denomination: recordParams.denomination,
				limit: recordParams.limit,
				period: translatePeriodToFrontend(recordParams.period),
				burstLimit: recordParams.burstLimit,
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
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if(response.status === 204) {
					setTimeout(() => {
						setOpen(false);
						setOpenSnackBar(false);
						navigate(ROUTES.BANK);
					}, 1000);
				}
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case CREATE_BANK: {
			if (validateForm(true)) {
				const translatedPeriod = translatePeriodToBackend(formData.period);
				const postData = {
					acquirerId: formData.acquirerId,
					denomination: formData.denomination,
					limit: formData.limit,
					period: formData.period !== "" ? translatedPeriod : null,
					burstLimit: formData.burstLimit,
					rateLimit: formData.rateLimit,
				};
				try {
					const response = await fetchRequest({ urlEndpoint: BANKS_CREATE, method: "POST", abortController, body: postData, headers: { "Content-Type": "application/json" } })();
					setLoading(false);
					if (response?.success){
						handleSnackbar(ALERT_SUCCESS, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
						setTimeout(() => {
							setOpen(false);
							setOpenSnackBar(false);
							window.location.reload();
						}, 1000);
					} else if (!response?.success){
						handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
					}
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} else {
				setLoading(false);
			}
			break;
		}
		case UPDATE_BANK: {
			if (validateForm(false)) {
				const putData = {
					acquirerId: formData.acquirerId,
					denomination: formData.denomination,
					limit: formData.limit,
					period: translatePeriodToBackend(formData.period),
					burstLimit: formData.burstLimit,
					rateLimit: formData.rateLimit,
				};
				try {
					const response = await fetchRequest({ urlEndpoint: BANKS_UPDATE, method: "PUT", abortController, body: putData, headers: { "Content-Type": "application/json" } })();
					setLoading(false);
					if (response?.success){
						handleSnackbar(ALERT_SUCCESS, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
						sessionStorage.setItem("recordParamsBank", JSON.stringify(response.valuesObj));
						setTimeout(() => {
							setOpen(false);
							setOpenSnackBar(false);
							window.location.reload();
						}, 1000);
					} else if (!response?.success){
						handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
					}
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
                			inputProps={{ maxLength: MAX_LENGTH_SMALL, "data-testid": "bank-id-test", readOnly: type === UPDATE_BANK }} />
                	</Grid>
                	<Grid xs={5} item my={1}>
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
                			inputProps={{ maxLength: MAX_LENGTH_MEDIUM, "data-testid": "bank-denomination-test" }} />
                	</Grid>
                	<Grid item my={1} display={"flex"}>
                		<Grid >
                		<TextField
                			fullWidth
                			id="limit"
                			name="limit"
                			label={"Quota"}
                			placeholder={"12345"}
                			size="small"
                			value={ formData.limit }
                			onChange={handleChange}
                				onKeyDown={(e) => {if ( !(e.ctrlKey && e.key === "a") && !(e.ctrlKey && e.key === "c") && !(e.ctrlKey && e.key === "v") && !(e.ctrlKey && e.key === "x") && !(e.ctrlKey && e.key === "z") 
									&& e.key !== "Clear" && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Enter" 
								&& !(/^[0-9]$/i.test(e.key))) {
							  e.preventDefault();
                				}}}
                			error={Boolean(errors.limit)}
                			helperText={errors.limit}
                			inputProps={{ maxLength: MAX_LENGTH_NUMERIC, "data-testid": "bank-limit-test" }} />
                	</Grid>
                	<Grid >
                		<TextField
                			fullWidth
                			id="period"
                			name="period"
                			select
                			size="small"
                			defaultValue={EMPTY_SELECT_VALUE}
                			value={ formData.period ? formData.period : EMPTY_SELECT_VALUE }
                			onChange={handleChange}
                			error={Boolean(errors.period)}
                			helperText={errors.period}
                			inputProps={{ maxLength: MAX_LENGTH_MEDIUM, "data-testid": "bank-period-test" }}>
                				{quotaPeriodOptions?.map((el) => (
                					<MenuItem key={el.FEvalue} value={el.FEvalue}>{el.FEvalue}</MenuItem>
                				)
                				)}
                			</TextField>
                	</Grid>               	
                	</Grid>
                	<Grid xs={5} item my={1}>
                		<TextField
                			fullWidth
                			id="rateLimit"
                			name="rateLimit"
                			label={"Rate"}
                			placeholder={"12345"}
                			size="small"
                			value={formData.rateLimit}
                			onChange={handleChange}
                			onKeyDown={(e) => {if ( !(e.ctrlKey && e.key === "a") && !(e.ctrlKey && e.key === "c") && !(e.ctrlKey && e.key === "v") && !(e.ctrlKey && e.key === "x") && !(e.ctrlKey && e.key === "z") 
								&& e.key !== "Clear" && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Enter" && e.key !== "."
							&& !(/^[0-9]$/i.test(e.key))) {
						  e.preventDefault();
                			}}}
                			error={Boolean(errors.rateLimit)}
                			helperText={errors.rateLimit}
                			inputProps={{ maxLength: MAX_LENGTH_NUMERIC, "data-testid": "bank-rate-test" }} />
                	</Grid>
                	<Grid xs={5} item my={1}>
                	<TextField
                			fullWidth
                			id="burstLimit"
                			name="burstLimit"
                			label={"Burst"}
                			placeholder={"12345"}
                			size="small"
                			value={ formData.burstLimit }
                			onChange={handleChange}
                			onKeyDown={(e) => {if ( !(e.ctrlKey && e.key === "a") && !(e.ctrlKey && e.key === "c") && !(e.ctrlKey && e.key === "v") && !(e.ctrlKey && e.key === "x") && !(e.ctrlKey && e.key === "z") 
								&& e.key !== "Clear" && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Enter" 
							&& !(/^[0-9]$/i.test(e.key))) {
						  e.preventDefault();
                		}}}
                			error={Boolean(errors.burstLimit)}
                			helperText={errors.burstLimit}
                			inputProps={{ maxLength: MAX_LENGTH_NUMERIC, "data-testid": "bank-burst-test" }} />
                	</Grid>
                	</>
                
				}
				<ActionAlert
					setOpenSnackBar={setOpenSnackBar}
					openSnackBar={openSnackBar}
					severity={severity}
					message={message}
					title={title}
					// errorCode={errorCode}
				/>
			</Grid>
		</ModalTemplate>
	);
};

export default ModalBank;