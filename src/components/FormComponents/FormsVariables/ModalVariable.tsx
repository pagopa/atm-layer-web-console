import { SetStateAction, useContext, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar } from "../../Commons/Commons";

import ModalTemplate from "../template/ModalTemplate";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import ROUTES from "../../../routes";
import { DELETE_VARIABLES, UPDATE_VARIABLES } from "../../../commons/endpoints";
import { DELETE_VARIABLE, UPDATE_VARIABLE } from "../../../commons/constants";

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

	const content = getTextModal(type);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);
		switch (type) {
		case DELETE_VARIABLE: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(DELETE_VARIABLES, { name: recordParams.name }), method: "DELETE", abortController })();
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
		case UPDATE_VARIABLE: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(UPDATE_VARIABLES, { name: recordParams.name, value: recordParams.value }), method: "PUT", abortController })();
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
		/>
	);
};

export default ModalVariable;