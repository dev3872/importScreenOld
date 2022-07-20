import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import DropDownSort from "./DropDownSort";
import { Menu } from "antd";

configure({ adapter: new Adapter() });
global.matchMedia =
	global.matchMedia ||
	function () {
		return {
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	};
describe("Status Formatter", () => {
	test("should first", () => {
		const mockHandleSort = jest.fn();
		const wrapper = mount(
			<DropDownSort
				title={"BSN"}
				attribute={"bsn"}
				handleSort={mockHandleSort}
				options={["ascending", "descending"]}
			/>
		);
        console.log(wrapper.prop('overlay'))
	});
});
