import { DELETE_BANK, UPDATE_BANK } from "../../commons/constants";
import DetailButtons from "./DetailButtons";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const BankDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const buttonConfigs = [
	  { text: "Aggiorna", action: UPDATE_BANK },
	  { text: "Cancella", action: DELETE_BANK },
	];
  
	return <DetailButtons type={type} setType={setType} openDialog={openDialog} detail={detail} buttonConfigs={buttonConfigs} />;
};
  

export default BankDetailButtons;