import { useContext } from "react";
import { Ctx } from "../../DataContext";
import { DELETE_WR, DEPLOY_WR, DOWNLOAD_WR, LETTURA, RILASCIO, ROLLBACK_WR, SCRITTURA, UPDATE_WR } from "../../commons/constants";
import { getFilteredButtonConfig, getRoleDescriptionsByUser } from "../Commons/Commons";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const WorkflowResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);
	
	const userProfileDescriptions = getRoleDescriptionsByUser(loggedUserInfo);

	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_WR, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA)},
	  { text: "Rilascia", action: DEPLOY_WR, disabledCondition: () => detail.status === "DEPLOYED", visibleCondition: () => userProfileDescriptions.includes(RILASCIO) },
	  { text: "Ripristina", action: ROLLBACK_WR, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Cancella", action: DELETE_WR, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Scarica", action: DOWNLOAD_WR, visibleCondition: () => userProfileDescriptions.includes(LETTURA) }
	];
  
	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
	
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};
  

export default WorkflowResourcesDetailButtons;