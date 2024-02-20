import { SetStateAction, useContext } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import fetchUpdateResources from "../../../hook/fetch/Resources/fetchUpdateResources";
import { handleSnackbar } from "../../../utils/Commons";
import { DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../../commons/constants";
import { RESOURCES_DELETE } from "../../../commons/endpoints";
import fetchDeleteResources from "../../../hook/fetch/Resources/fetchDeleteResources";
import ModalTemplateUpload from "../template/ModalTemplateUpload";
import ModalTemplate from "../template/ModalTemplate";


type Props = {
  type: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSnackBar?: boolean;
  setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
  severity?: any;
  setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
  message?: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  title?: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
};

// export const ModalResources = ({
// 	type,
// 	open,
// 	setOpen,
// 	openSnackBar,
// 	setOpenSnackBar,
// 	severity,
// 	setSeverity,
// 	message,
// 	setMessage,
// 	title,
// 	setTitle,
// }: Props) => {
// 	const { abortController } = useContext(Ctx);
// 	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
// 	const navigate = useNavigate();
// 	const handleSubmit = async (e: React.FormEvent) => {
// 		switch (type) {
// 		case UPDATE_RES: {
// 			try {
// 				const response = await fetchUpdateResources({
// 					abortController,
// 					URL: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }),
// 				})();
// 				if (response?.success) {
// 					setOpen(false);
// 					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
// 					console.log(response);
// 				} else {
// 					setOpen(false);
// 					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
export const ModalResources = ({type, open, setOpen, openSnackBar, setOpenSnackBar, severity, setSeverity, message, setMessage, title, setTitle }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const handleSubmit = async (e: React.FormEvent) => {
		switch (type) {
		case DELETE_RES: {
			try {
				const response = await fetchDeleteResources({abortController, URL: generatePath(RESOURCES_DELETE, { uuid: recordParams.resourceId }) })();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_RES:{
			break;
		}
		case UPDATE_RES: {
			break;
		}
		default: return;
		}
	};

	return (
		<>
			{type === DELETE_RES &&
		<ModalTemplate
			titleModal={"Cancellazione risorsa statica"}
			contentText={"Sei sicuro di voler cancellare questa risorsa statica?"}
			open={open}
			setOpen={setOpen}
			handleSubmit={handleSubmit}
		/>}
			{type === DOWNLOAD_RES &&
		<ModalTemplate
			titleModal={"Scarica risorsa statica"}
			contentText={"Sei sicuro di voler scaricare questa risorsa statica?"}
			open={open}
			setOpen={setOpen}
			handleSubmit={handleSubmit}
		/>}
			{type ===UPDATE_RES &&
		<ModalTemplateUpload 
			titleModal={"Update risorsa statica"}
			contentText={"Carica il file aggiornato"}
			open={open}
			setOpen={setOpen}
			recordParams={recordParams} handleSnackbar={handleSnackbar} abortController={abortController} setMessage={setMessage} setSeverity={setSeverity} setTitle={setTitle} setOpenSnackBar={setOpenSnackBar} type={UPDATE_RES}	/>}
		</>
	);
};

export default ModalResources;
