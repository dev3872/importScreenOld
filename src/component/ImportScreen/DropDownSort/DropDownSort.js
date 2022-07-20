import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DropDownSort = ({ title, attribute, handleSort, options }) => {
	const menu = (
		<Menu
			onClick={handleSort}
			items={[
				...options.map((value, index) => {
					return { key: index, label: value };
				}),
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<span onClick={(event) => console.log(event)}>
				<Space>
					{title}
					<DownOutlined />
				</Space>
			</span>
		</Dropdown>
	);
};

DropDownSort.propTypes = {
	handleSort: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	attribute: PropTypes.string.isRequired,
};

export default DropDownSort;
