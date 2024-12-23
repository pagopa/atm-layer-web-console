import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import DetailBank from "../../components/Detail/DetailBank";

const BankDetailPage = () => {

	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBank:true}, false), "Dettaglio banca");
	const fields = [
		{ label: "Id Banca", value: "acquirerId" },
		{ label: "Nome Banca", value: "denomination" },
		{label:"", value: ""},
		{ label: "Client Id", value: "clientId" },
		{ label: "", value: "" },
		// { label: "Client Secret", value: "clientSecret" },
		// { label: "ApiKey Id", value: "apiKeyId" },
		{ label: "", value: "" },
		// { label: "ApiKey", value: "apiKeySecret" },
		// { label: "Usage Plan Id", value: "usagePlanId" },
		{ label: "Limite chiamate", value: "limit" },
		// { label: "Periodo", value: "period" },
		{ label: "Rate", value: "rateLimit" },
		{ label: "Burst", value: "burstLimit" },
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
