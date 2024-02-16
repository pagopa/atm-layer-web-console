import { SetStateAction, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { UPDATE_RES } from "../../../commons/constants";
import fetchUpdateResources from "../../../hook/fetch/Resources/fetchUpdateResources";
import { RESOURCES_UPDATE } from "../../../commons/endpoints";
import { handleSnackbar } from "../../../utils/Commons";

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

export const ModalResources = ({
	type,
	open,
	setOpen,
	openSnackBar,
	setOpenSnackBar,
	severity,
	setSeverity,
	message,
	setMessage,
	title,
	setTitle,
}: Props) => {
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {
		switch (type) {
		case UPDATE_RES: {
			try {
				const response = await fetchUpdateResources({
					abortController,
					URL: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }),
				})();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
					console.log(response);
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		}
	};
};
