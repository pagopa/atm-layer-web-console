import { useContext } from "react";
import { DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../commons/constants";
import { Ctx } from "../../DataContext";
import { getFilteredButtonConfig, getRoleIdsByUser } from "../Commons/Commons";
import DetailButtons from "./DetailButtons";


type Props = {
    type?: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    openDialog: (type: string) => void;
    detail: any;
  };

const ResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getRoleIdsByUser(loggedUserInfo);
	
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_RES, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Cancella", action: DELETE_RES, visibleCondition: () => userProfileIds.includes(2) },
	  { text: "Scarica", action: DOWNLOAD_RES , visibleCondition: () => userProfileIds.includes(1) }
	];

	const filteredButtonConfigs = getFilteredButtonConfig(buttonConfigs);
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={filteredButtonConfigs} />;
};

export default ResourcesDetailButtons;