import React from "react";
import parse from "html-react-parser";
import "./DecodeRenderHtml.css";
import { base64_decode } from "../../commons/decode";
import resp from "./resp.json";

const template= resp?.task?.template?.content;




const getTemplate=(element:string)=>parse(element);


export function DecodeRenderHtml() : JSX.Element {

	const element= base64_decode(template);
	return (
		<React.Fragment>
			{getTemplate(element)}
	 	{/* <div dangerouslySetInnerHTML={ { __html: base64_decode(template)}}/> */}
		</React.Fragment>
        
	);
}

