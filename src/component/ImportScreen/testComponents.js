import React from "react";
import PropTypes from "prop-types";
import { DatePicker, Select, Space, Table, TimePicker } from "antd";
import { handleChange, handleSort, isValidAttribute } from "./testFunctions";
import { attributes } from "./testData";
import moment from "moment";
import DropDownSort from "./DropDownSort/DropDownSort";
const RenderBSN = (props) => {
	return (
		<Space
			className={
				props.value
					? "width-md border grey-border"
					: "width-md border red-border"
			}
		>
			{props.value}
			{/* TODO EDIT */}
		</Space>
	);
};

RenderBSN.propTypes = {
	value: PropTypes.string.isRequired,
};

const RenderSelect = (props) => {
	return (
		<Select
			bordered={false}
			defaultValue={props.value}
			className={
				isValidAttribute(props.value, "size")
					? "width-md border grey-border"
					: "width-md border red-border"
			}
			onChange={props.onChange}
		>
			{attributes[0].list.map(function (value, index) {
				return (
					<Select.Option key={index} value={value}>
						{value}
					</Select.Option>
				);
			})}
		</Select>
	);
};

RenderSelect.propTypes = {
	value: PropTypes.string.isRequired,
};

const RenderDatePicker = (props) => {
	return (
		<Space
			className={
				isValidAttribute(moment(props.value).isValid, "datetime")
					? "width-md border grey-border"
					: "width-md border red-border"
			}
		>
			<DatePicker
				bordered={false}
				defaultValue={moment(props.value)}
				format={"MMM Do YYYY"}
				onChange={props.onChange}
			/>
		</Space>
	);
};

RenderDatePicker.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const RenderTimePicker = (props) => {
	return (
		<Space
			className={
				isValidAttribute(moment(props.value, "HH:mm").isValid, "datetime")
					? "width-md border grey-border"
					: "width-md border red-border"
			}
		>
			<TimePicker
				bordered={false}
				format="HH:mm"
				allowClear={false}
				defaultValue={moment(props.value, "HH:MM")}
				onChange={props.onChange}
			/>
		</Space>
	);
};
RenderTimePicker.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const RenderCOD = (props) => {
	return (
		<Select
			bordered={false}
			defaultValue={props.value}
			className={
				isValidAttribute(props.value, "boolean")
					? "width-md border grey-border"
					: "width-md border red-border"
			}
			onChange={props.onChange}
		>
			<Select.Option key={0} value={"No"}>
				{"No"}
			</Select.Option>
			<Select.Option key={1} value={"Yes"}>
				{"Yes"}
			</Select.Option>
		</Select>
	);
};
RenderCOD.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const RenderEMI = (props) => {
	return (
		<Select
			bordered={false}
			defaultValue={props.value}
			className={
				isValidAttribute(props.value, "boolean")
					? "width-md border grey-border"
					: "width-md border red-border"
			}
			onChange={props.onChange}
		>
			<Select.Option key={0} value={"No"}>
				{"No"}
			</Select.Option>
			<Select.Option key={1} value={"Yes"}>
				{"Yes"}
			</Select.Option>
		</Select>
	);
};

RenderEMI.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const column1 = (data,setData) => (
	<Table.Column
		title={<DropDownSort
			title={"BSN"}
			attribute={"bsn"}
			handleSort={(event) => handleSort(event, data, setData)}
			options={["ascending", "descending"]}
		/>}
		dataIndex="bsn"
		key="bsn"
		render={function (value, record) {
			return <RenderBSN value={value} />;
		}}
	/>
);
const column2 = (data,setData) => (
	<Table.Column
		title="Size"
		dataIndex="size"
		key="size"
		render={function (value, record) {
			return (
				<RenderSelect
					value={value}
					onChange={(value1, record1) =>
						handleChange(value1, record, "size", data, setData)
					}
				/>
			);
		}}
	/>
);
const column3 = (data,setData) => (
	<Table.Column
		title={"Date"}
		dataIndex="updated_on"
		key="updated_on"
		render={function (value, record) {
			return (
				<RenderDatePicker
					value={value}
					onChange={(value1, record1) =>
						handleChange(value1, record, "updated_on", data, setData)
					}
				/>
			);
		}}
	/>
);
const column4 = (data,setData) => (
	<Table.Column
		title={"Time"}
		dataIndex="update_time"
		key="update_time"
		render={(value, record) => {
			return (
				<RenderTimePicker
					value={value}
					onChange={(value1, record1) =>
						handleChange(value1, record, "update_time", data, setData)
					}
				/>
			);
		}}
	/>
);
const column5 = (data,setData) => (
	<Table.Column
		title={"COD Available"}
		dataIndex="cod_available"
		key="cod_available"
		render={(value, record) => (
			<RenderCOD
				value={value}
				onChange={(value1, record1) =>
					handleChange(value1, record, "cod_available", data, setData)
				}
			/>
		)}
	/>
);
const column6 = (data,setData) => (
	<Table.Column
		title={"EMI Available"}
		dataIndex="emi_available"
		key="emi_available"
		render={(value, record) => (
			<RenderEMI
				value={value}
				onChange={function (value1, record1) {
					handleChange(value1, record, "emi_available", data, setData);
				}}
			/>
		)}
	/>
);
export {
	RenderBSN,
	RenderSelect,
	RenderDatePicker,
	RenderTimePicker,
	RenderCOD,
	RenderEMI,
	column1,
	column2,
	column3,
	column4,
	column5,
	column6
};
