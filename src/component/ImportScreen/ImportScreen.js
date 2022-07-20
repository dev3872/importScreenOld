import { Table } from "antd";
import React from "react";
import { useState } from "react";
import "./style.css";
import 'antd/dist/antd.css'
import { product } from "./testData";
import {
	column1,
	column2,
	column3,
	column4,
	column5,
	column6,
} from "./testComponents";
function ImportScreen() {
	const [data, setData] = useState([...product]);
	return (
		<div>
			<Table dataSource={data} size={"large"} rowClassName={"row-height"}>
				{column1(data,setData)}
				{column2(data,setData)}
				{column3(data,setData)}
				{column4(data,setData)}
				{column5(data,setData)}
				{column6(data,setData)}
			</Table>
		</div>
	);
}

export default ImportScreen;
