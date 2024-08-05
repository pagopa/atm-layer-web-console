import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { useContext } from "react";
import { Ctx } from "../../DataContext";
import { HeaderAccountCustom } from "./HeaderAccountCustom";


export const Header = () => {
	const { logged, clearAll } = useContext(Ctx);
	

	const handleLogout=()=>{
		clearAll();
	};

	return(
		<HeaderAccountCustom
			onLogout={handleLogout}
			loggedUser={logged}
			rootLink={{
				element: <LogoPagoPACompany color="default" variant="default" />,
				ariaLabel: "PagoPA",
				title: "PagoPA-logo"
			
			}}
		/>
	);
};