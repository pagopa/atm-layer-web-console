import { DELETE_WR, DEPLOY_WR, DOWNLOAD_WR, ROLLBACK_WR, UPDATE_WR } from "../../commons/constants";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const WorkflowResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_WR },
	  { text: "Rilascia", action: DEPLOY_WR, disabledCondition: () => detail.status === "DEPLOYED" },
	  { text: "Ripristina", action: ROLLBACK_WR },
	  { text: "Cancella", action: DELETE_WR },
	  { text: "Scarica", action: DOWNLOAD_WR }
	];
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={buttonConfigs} />;
};
  

export default WorkflowResourcesDetailButtons;