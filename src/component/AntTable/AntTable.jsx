import React, { useEffect, useState } from "react";
//import './AntTable.scss';
import "antd/dist/antd.min.css";
import { Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Column from "antd/lib/table/Column";
import { handleSort } from "./testFunctions";
import { DropDown } from "./Dropdown";
import axios from "axios";

const AntTable = () => {
	const [attribute, setAttribute] = useState("");
	const [selectedRows, setSelectedRows] = useState([]);
	const [oldData, setData] = useState(data);

	const items = [
		{ key: "1", label: "Ascending" },
		{ key: "2", label: "Descending" },
	];
	let data = [
		{
			key: "1",
			batchId: "#123",
			family: "Sarees",
			source: "Amazon",
			results: 85,
			imported: 85,
			lastUpdated: "March 10, 2022",
			link: "https://www.google.com",
			// img: sarees,
			pic: "sarees.jpeg",
		},
		{
			key: "2",
			batchId: "#456",
			family: "Handbags",
			source: "Amazon",
			results: 12,
			imported: 12,
			lastUpdated: "March 10, 2022",
			link: "https://www.amazon.in",
			pic: "handbags.jpg",
		},
		{
			key: "3",
			batchId: "#789",
			family: "Salwar Suit",
			source: "Flipkart",
			results: 9,
			imported: 9,
			lastUpdated: "March 10, 2022",
			link: "https://www.flipkart.com",
			pic: "salwarsuit.jpeg",
		},
		{
			key: "4",
			batchId: "#849",
			family: "Accessories",
			source: "Amazon",
			results: 300,
			imported: 300,
			lastUpdated: "March 10, 2022",
			link: "https://www.jiomart.com/",
			pic: "accessories.jpg",
		},
	];

	// useEffect(() => {
	//     axios.get('http://localhost:4000/rubick')
	//         .then((res) => {
	//             setData([...res.data])
	//         })
	//         .catch((e) => {
	//             return [];
	//         }); return () => { setData([]) }
	// }, [])

	const deleteHandler = () => {
		setData([...oldData.filter((item) => selectedRows.indexOf(item.key) < 0)]);

		// axios.delete('http://localhost:4000/rubick/delete', { data: { keys: selectedRows } }).then((res) => {
		//     setData([...res.data])
		// }).catch((e) => {
		//     return []
		// })
		setSelectedRows([]);
	};

	const onClearRowSelection = () => {
		setSelectedRows([]);
	};

	return (
		<div className="main-wrapper">
			<div className="table-wrapper">
				<Table
					dataSource={oldData}
					rowSelection={{
						typeTable: "checkbox",
						selectedRowKeys: selectedRows,
						onChange: (selectedRowKeys) => {
							setSelectedRows(selectedRowKeys);
						},
					}}
				>
					<Column
						title="Batch ID"
						dataIndex="batchId"
						key="key"
						render={(text, record) => (
							<a href={record.link} target="_blank" rel="noreferrer">
								{" "}
								{text}{" "}
							</a>
						)}
					/>

					<Column
						title={
							<DropDown
								title={"Family"}
								dataName={"family"}
								handleSort={handleSort}
								setAttribute={setAttribute}
								items={items}
								oldData={oldData}
								setData={setData}
								attribute={attribute}
							/>
						}
						dataIndex="family"
						key="key"
						render={(text, record) => (
							<>
								{/* <img alt='' src={record.img} style={{ height: '30px', width: '30px', marginRight: '10px' }} /> */}
								<img
									alt=""
									src={`http://localhost:4000/${record.pic}`}
									style={{ height: "30px", width: "30px", marginRight: "10px" }}
								/>
								<span> {text} </span>
							</>
						)}
					/>

					<Column
						title={
							<DropDown
								title={"Source"}
								dataName={"source"}
								handleSort={handleSort}
								setAttribute={setAttribute}
								items={items}
								oldData={oldData}
								setData={setData}
								attribute={attribute}
							/>
						}
						dataIndex="source"
						key="key"
					/>

					<Column
						title={
							<DropDown
								title={"Results"}
								dataName={"results"}
								handleSort={handleSort}
								setAttribute={setAttribute}
								items={items}
								oldData={oldData}
								setData={setData}
								attribute={attribute}
							/>
						}
						dataIndex="results"
						key="key"
					/>

					<Column
						title={
							<DropDown
								title={"Imported"}
								dataName={"imported"}
								handleSort={handleSort}
								setAttribute={setAttribute}
								items={items}
								oldData={oldData}
								setData={setData}
								attribute={attribute}
							/>
						}
						dataIndex="imported"
						key="key"
					/>

					<Column title="Last Updated" dataIndex="lastUpdated" key="key" />

					<Column
						title="Action"
						dataIndex="action"
						key="key"
						render={() => (
							<Dropdown
								overlay={
									<Menu
										items={[
											{ key: "1", label: "View" },
											{ key: "2", label: "Edit" },
										]}
									/>
								}
								trigger="click"
							>
								<MoreOutlined />
							</Dropdown>
						)}
					/>
				</Table>
			</div>

			{selectedRows.length > 0 ? (
				<div className="table-footer">
					<div className="table-toolbar">
						{selectedRows.length} Row{selectedRows.length > 1 ? "s" : null}{" "}
						Selected
					</div>
					<div className="table-toolbar">
						<a
							className="clearRowSelection"
							onClick={() => onClearRowSelection(setSelectedRows)}
						>
							Clear Selection
						</a>
						<a
							className="deleteRowSelection"
							onClick={() =>
								deleteHandler(setData, oldData, selectedRows, setSelectedRows)
							}
						>
							<span className="deleteRow">Delete</span>
						</a>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default AntTable;
