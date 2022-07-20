import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ImportScreen from "./ImportScreen";
import { Table } from "antd";
import { handleChange, handleSort, isValidAttribute } from "./testFunctions";
import { product } from "./testData";
configure({ adapter: new Adapter() });
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
describe('Import Screen', () => {
  it("renders the outer div",()=>{
    let wrapper = shallow(<ImportScreen/>)
    const outerDiv = wrapper.find('div')
    expect(outerDiv).toBeDefined()
  })
  it("renders the antd table component",()=>{
    let wrapper = shallow(<ImportScreen/>)
    const tableWrapper = wrapper.find(Table)
    expect(tableWrapper).toBeDefined()
  })
  it("renders 6 columns",()=>{
    let wrapper = shallow(<ImportScreen/>)
    const ColumnWrapper = wrapper.find('Column')
    expect(ColumnWrapper).toHaveLength(6)
  })
});
describe("Column1",()=>{
  it("has a title property",()=>{
    let wrapper = shallow(<ImportScreen/>)
    const columnWrapper  = wrapper.find('Column')
    //console.log(columnWrapper.at(0).prop('title'))
    const DropDownSortWrapper = mount(columnWrapper.at(0).prop('title'))
    expect(DropDownSortWrapper.prop('title')).toMatch("BSN")
  })
})
describe("isValidateAttribute",()=>{
  it("validates size attributes",()=>{
    const isValidAttributeMock = jest.fn(isValidAttribute)
    isValidAttributeMock("8","size")
    expect(isValidAttributeMock.mock.results[0].value).toBe(false)
  })
  it("validates datetime attributes",()=>{
    const isValidAttributeMock = jest.fn(isValidAttribute)
    isValidAttributeMock(true,"datetime")
    expect(isValidAttributeMock.mock.results[0].value).toBe(true)
  })
  it("validates boolean attributes",()=>{
    const isValidAttributeMock = jest.fn(isValidAttribute)
    isValidAttributeMock("Yes","boolean")
    isValidAttributeMock("","boolean")
    expect(isValidAttributeMock.mock.results[0].value).toBe(true)
    expect(isValidAttributeMock.mock.results[1].value).toBe(false)
  })
})

describe("handleChange",()=>{
  it("calls setdata on every execution",()=>{
    const handleChangeMock = jest.fn(handleChange)
    const setDataMock = jest.fn()
    handleChangeMock("8 GB",{key:"2"},"size",product,setDataMock)
    expect(setDataMock).toHaveBeenCalledTimes(1)
  })
})

describe("handleSort",()=>{
  it("calls setdata on every execution",()=>{
    const handleSortMock = jest.fn(handleSort)
    const setDataMock = jest.fn()
    handleSortMock({key:"0"},product,setDataMock)
    handleSortMock({key:"1"},product,setDataMock)
    expect(setDataMock).toHaveBeenCalledTimes(2)
  })
})
