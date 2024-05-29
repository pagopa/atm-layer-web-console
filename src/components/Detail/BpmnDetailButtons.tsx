import { useContext } from "react";
import ROUTES from "../../routes";
import { ASSOCIATE_BPMN, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN, UPGRADE_BPMN } from "../../commons/constants";
import { Ctx } from "../../DataContext";
import { getFilteredButtonConfig, getRoleIdsByUser } from "../Commons/Commons";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const BpmnDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getRoleIdsByUser(loggedUserInfo);

	const buttonConfigs = [
	  { text: "Aggiorna", action: UPGRADE_BPMN, navigate: ROUTES.UPGRADE_BPMN, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Rilascia", action: DEPLOY_BPMN, disabledCondition: () => detail.status === "DEPLOYED", visibleCondition: () => userProfileIds.includes(3) },
	  { text: "Associa", action: ASSOCIATE_BPMN, disabledCondition: () => detail.status !== "DEPLOYED", navigate: ROUTES.ASSOCIATE_BPMN, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Cancella", action: DELETE_BPMN, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Scarica", action: DOWNLOAD_BPMN, visibleCondition: () => userProfileIds.includes(1) }
	];

	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};

export default BpmnDetailButtons;
