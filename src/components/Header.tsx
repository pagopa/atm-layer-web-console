import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { HeaderAccountCustom } from "./HeaderComponents/HeaderAccountCustom";


export const Header = () => (
	<HeaderAccountCustom
		rootLink={{
			element: <LogoPagoPACompany color="default" variant="default" />,
			href: "https://www.pagopa.gov.it/",
			ariaLabel: "Link: vai al sito di PagoPA S.p.A.",
			title: "Sito di PagoPA S.p.A."
		}}
		// enableAssistanceButton
		onAssistanceClick={() => console.log("clicked!")} 
	/>
	
);