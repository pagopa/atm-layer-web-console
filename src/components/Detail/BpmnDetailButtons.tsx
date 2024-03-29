import ROUTES from "../../routes";
import { ASSOCIATE_BPMN, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN, UPGRADE_BPMN } from "../../commons/constants";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const BpmnDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPGRADE_BPMN, navigate: ROUTES.UPGRADE_BPMN },
	  { text: "Rilascia", action: DEPLOY_BPMN, disabledCondition: () => detail.status === "DEPLOYED" },
	  { text: "Associa", action: ASSOCIATE_BPMN, disabledCondition: () => detail.status !== "DEPLOYED", navigate: ROUTES.ASSOCIATE_BPMN },
	  { text: "Cancella", action: DELETE_BPMN },
	  { text: "Scarica", action: DOWNLOAD_BPMN }
	];
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={buttonConfigs} />;
};

export default BpmnDetailButtons;
