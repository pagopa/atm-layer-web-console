import { useState, useEffect } from "react";
import { PROCESS_RESOURCES } from "../../commons/constants";
import DetailBody from "./DetailBody";


type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
    bpmnAssociateTable?: boolean;
};

const DetailBpmn = ({
	detailFields,
	detailTitle,
	breadComponent,
	bpmnAssociateTable,
}: Props) => {
	const [detail, setDetail] = useState({});
	
	useEffect(() => {
		const storedRecordParams = sessionStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);

	return (
		<DetailBody 
			detail={detail}
			driver={PROCESS_RESOURCES}
			detailFields={detailFields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
			bpmnAssociateTable={bpmnAssociateTable}
		/>
	);
};

export default DetailBpmn;