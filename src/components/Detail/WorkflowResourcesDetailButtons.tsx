import { useContext } from "react";
import { DELETE_WR, DEPLOY_WR, DOWNLOAD_WR, ROLLBACK_WR, UPDATE_WR } from "../../commons/constants";
import { Ctx } from "../../DataContext";
import { getFilteredButtonConfig, getRoleIdsByUser } from "../Commons/Commons";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const WorkflowResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getRoleIdsByUser(loggedUserInfo);

	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_WR, visibleCondition: () => userProfileIds.includes(2)},
	  { text: "Rilascia", action: DEPLOY_WR, disabledCondition: () => detail.status === "DEPLOYED", visibleCondition: () => userProfileIds.includes(3) },
	  { text: "Ripristina", action: ROLLBACK_WR, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Cancella", action: DELETE_WR, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Scarica", action: DOWNLOAD_WR, visibleCondition: () => userProfileIds.includes(1) }
	];
  
	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
	
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};
  

export default WorkflowResourcesDetailButtons;