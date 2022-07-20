import { Select, Space } from "antd";
import { RenderBSN } from "./testComponents";
import { attributes } from "./testData";

export const handleSort = (event, data, setData) => {
	if (event.key === "0") {
		//ascending
		setData([
			...data.sort((a, b) =>
				a["bsn"] > b["bsn"] ? 1 : b["bsn"] > a["bsn"] ? -1 : 0
			),
		]);
	} else {
		//descending
		setData([
			...data.sort((a, b) =>
				a["bsn"] < b["bsn"] ? 1 : b["bsn"] < a["bsn"] ? -1 : 0
			),
		]);
	}
};
export const handleChange = (value1, record, attribute, data, setData) => {
	setData([
		...data.map((oldData, index) => {
			if (parseInt(record.key) - 1 === index)
				return {
					...oldData,
					[attribute]: value1,
				};
			else
				return {
					...oldData,
				};
		}),
	]);
};
export function isValidAttribute (value, attribute) {
	if (attribute === "size") {
		console.log("here")
		if (attributes[0].list.indexOf(value) > -1) return true;
		else return false;
	} else if (attribute === "datetime") {
		return value;
	} else if (attribute === "boolean") {
		if (value === "Yes" || value === "No") {
			return true;
		} else {
			return false;
		}
	}
};
