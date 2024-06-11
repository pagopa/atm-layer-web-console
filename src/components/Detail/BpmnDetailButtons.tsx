import { useContext } from "react";
import ROUTES from "../../routes";
import { ASSOCIATE_BPMN, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN, LETTURA, RILASCIO, SCRITTURA, UPGRADE_BPMN } from "../../commons/constants";
import { getFilteredButtonConfig, getProfileIdsArray } from "../Commons/Commons";
import { Ctx } from "../../DataContext";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const BpmnDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);
	
	const userProfileDescriptions = getProfileIdsArray(loggedUserInfo);
	

	const buttonConfigs = [
	  { text: "Aggiorna", action: UPGRADE_BPMN, navigate: ROUTES.UPGRADE_BPMN, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Rilascia", action: DEPLOY_BPMN, disabledCondition: () => detail.status === "DEPLOYED", visibleCondition: () => userProfileDescriptions.includes(RILASCIO) },
	  { text: "Associa", action: ASSOCIATE_BPMN, disabledCondition: () => detail.status !== "DEPLOYED", navigate: ROUTES.ASSOCIATE_BPMN, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Cancella", action: DELETE_BPMN, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Scarica", action: DOWNLOAD_BPMN, visibleCondition: () => userProfileDescriptions.includes(LETTURA) }
	];

	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};

export default BpmnDetailButtons;
