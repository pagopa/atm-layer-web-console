import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import formatValues from "../../utils/formatValues";
import DetailBank from "../../components/Detail/DetailBank";

const BankDetailPage = () => {

	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBank:true}, false), "Dettaglio banca");
	const fields = [
		{ label: "Id Banca", value: "acquirerId" },
		// { label: "Nome Banca", value: "denomination" },
		{ label: "Limite Rate", value: "rateLimit" },
		{ label: "Client Id", value: "clientId" },
		{ label: "Client Secret", value: "clientSecret" },
	];

	return (
		<DetailBank
			detailFields={fields}
			detailTitle={"Dettaglio banca"}
			breadComponent={breadComponent}
			bpmnAssociateTable={true}
		/>
	);
};


export default BankDetailPage;
