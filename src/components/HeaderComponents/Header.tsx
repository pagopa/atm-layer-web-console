import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { HeaderAccountCustom } from "./HeaderAccountCustom";


export const Header = () => {
	const { logged, setLogged } = useContext(Ctx);
	const navigate = useNavigate();
	
	const handleLogout=()=>{
		setLogged(false);
		localStorage.removeItem("jwt");
		navigate("/");
	};

	return(
		<HeaderAccountCustom
			onLogout={handleLogout}
			loggedUser={logged}
			rootLink={{
				element: <LogoPagoPACompany color="default" variant="default" />,
				// href: "https://www.pagopa.gov.it/",
				ariaLabel: "Link: vai al sito di PagoPA S.p.A.",
				title: "Sito di PagoPA S.p.A."
			
			}}
		/>
	);
};