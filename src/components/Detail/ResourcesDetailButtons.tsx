import { useContext } from "react";
import { Ctx } from "../../DataContext";
import { DELETE_RES, DOWNLOAD_RES, LETTURA, SCRITTURA, UPDATE_RES } from "../../commons/constants";
import { getFilteredButtonConfig, getProfileIdsArray } from "../Commons/Commons";
import DetailButtons from "./DetailButtons";


type Props = {
    type?: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    openDialog: (type: string) => void;
    detail: any;
  };

const ResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileDescriptions = getProfileIdsArray(loggedUserInfo);
	
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_RES, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Cancella", action: DELETE_RES, visibleCondition: () => userProfileDescriptions.includes(SCRITTURA) },
	  { text: "Scarica", action: DOWNLOAD_RES , visibleCondition: () => userProfileDescriptions.includes(LETTURA) }
	];

	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};

export default ResourcesDetailButtons;