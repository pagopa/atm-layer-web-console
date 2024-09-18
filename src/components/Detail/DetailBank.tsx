import { useState, useEffect } from "react";
import { BANKS } from "../../commons/constants";
import DetailBody from "./DetailBody";


type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
    bpmnAssociateTable?: boolean;
};

const DetailBank = ({
	detailFields,
	detailTitle,
	breadComponent,
	bpmnAssociateTable,
}: Props) => {
	const [detail, setDetail] = useState({});
	
	useEffect(() => {
		const storedRecordParams = sessionStorage.getItem("recordParamsBank");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);

	return (
		<DetailBody 
			detail={detail}
			driver={BANKS}
			detailFields={detailFields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
			bpmnAssociateTable={bpmnAssociateTable}
		/>
	);
};

export default DetailBank;