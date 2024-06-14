import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";
import TransactionsDataGrid from "./TransactionsDataGrid";

const TransactionsPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isTrnsc:false}, false), "Transazioni");

	return (
		<CommonPage breadComponent={breadComponent}>
			<TransactionsDataGrid />
		</CommonPage>
	);
};

export default TransactionsPage;
