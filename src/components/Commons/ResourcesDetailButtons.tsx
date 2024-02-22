import { DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../commons/constants";
import DetailButtons from "./DetailButtons";


type Props = {
    type?: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    openDialog: (type: string) => void;
    detail: any;
  };

const ResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_RES },
	  { text: "Cancella", action: DELETE_RES },
	  { text: "Scarica", action: DOWNLOAD_RES }
	];
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={buttonConfigs} />;
};

export default ResourcesDetailButtons;