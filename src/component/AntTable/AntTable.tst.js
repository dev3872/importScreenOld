import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import AntTable from './AntTable';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import data from './data';
import { handleSort } from './functions';
import { DropDown, Menuu } from './Dropdown';

import axios from "axios";
const axiosApi = axios.create()
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axiosApi);

afterEach(cleanup);

window.matchMedia = window.matchMedia || function () { return { matches: false, addListener: function () { }, removeListener: function () { } }; };


describe('Table ', () => {

    it('should have main-wrapper class', () => {
        let component = shallow(<AntTable />);
        expect(component.find('.main-wrapper').exists()).toBe(true);
    })

    it('should have table-wrapper class', () => {
        let component = shallow(<AntTable />);
        expect(component.find('.table-wrapper').exists()).toBe(true);
    })

    it('should have two div tag', () => {
        let component = shallow(<AntTable />);
        expect(component.find('div')).toHaveLength(2);
    })

    it('should have table component from ant design', () => {
        render(<AntTable />);
        expect(screen.getByRole('table')).toBeInTheDocument();
    })

    it('should have Table component with data source property', () => {
        let component = shallow(<AntTable />);
        expect(component.find(Table).prop('dataSource')).toBeDefined();
    })

    it('should have Columns in table component', () => {
        let component = shallow(<AntTable />);
        expect(component.find(Table).find(Column).exists()).toBe(true);
    })

    it('should render batch id after calling api', async () => {
        render(<AntTable />)
        await waitFor(() => {
            return expect(
                screen.getByText(data[0].batchId)
            ).toBeInTheDocument();
        });
    })

    it('should have 7 columns in table component', () => {
        let component = shallow(<AntTable />);
        expect(component.find(Table).find(Column)).toHaveLength(7);
    })

    it('should toggle row selection on onChange', () => {
        let component = shallow(<AntTable />);
        component.find(Table).props().rowSelection.onChange([1]);
        expect(component.find(Table).props().rowSelection.selectedRowKeys).toEqual([1]);
    })

    it('should clear selected rows when click on clear selection', () => {
        let component = shallow(<AntTable />);
        component.find(Table).props().rowSelection.onChange([1]);
        expect(component.find(Table).props().rowSelection.selectedRowKeys).toEqual([1]);
        component.find('.main-wrapper').find('.clearRowSelection').simulate('click');
        expect(component.find(Table).props().rowSelection.selectedRowKeys.length).toBe(0);
    })

    it('should clear selected rows when click on delete', () => {
        let component = shallow(<AntTable />);
        component.find(Table).props().rowSelection.onChange([1]);
        expect(component.find(Table).props().rowSelection.selectedRowKeys).toEqual([1]);
        component.find('.main-wrapper').find('.deleteRowSelection').simulate('click');
        expect(component.find(Table).props().rowSelection.selectedRowKeys.length).toBe(0);
    })




})


describe('DropDown.js ', () => {

    it('should call setData on every execution', () => {
        const handleSortMock = jest.fn(handleSort);
        const setDataMock = jest.fn();
        handleSortMock({ key: "1" }, data, setDataMock);
        handleSortMock({ key: "2" }, data, setDataMock);
        expect(setDataMock).toHaveBeenCalledTimes(2);
    })

    it('should call setAttribute on every execution', () => {
        const items = [
            { key: '1', label: 'Ascending' },
            { key: '2', label: 'Descending' },
        ]
        let handleSortMock = jest.fn(handleSort);
        let setAttributeMock = jest.fn();
        let setDataMock = jest.fn();
        let component = shallow(<DropDown
            title={'Family'}
            dataName={'family'}
            handleSort={handleSortMock}
            setAttribute={setAttributeMock}
            items={items}
            oldData={data}
            setData={setDataMock}
            attribute={'family'} />);

        component.find('span').simulate('click');
        expect(setAttributeMock).toHaveBeenCalledTimes(1);

    })

    it('should call handleSort function when clicked', () => {
        const items = [
            { key: '1', label: 'Ascending' },
            { key: '2', label: 'Descending' },
        ]
        let handleSortMock = jest.fn();
        let setAttributeMock = jest.fn();
        let setDataMock = jest.fn();
        let component = shallow(<Menuu
            handleSort={handleSortMock}
            items={items}
            oldData={data}
            setData={setDataMock}
            attribute={setAttributeMock} />);

        component.simulate('click');
        expect(handleSortMock).toHaveBeenCalledTimes(1);
    })
})


describe('axios ', () => {
    it('should get all the data from api', async () => {
        mock.onGet('http://localhost:4000/rubick').reply(200, {
            data: data,
        });
        let result = await axiosApi.get('http://localhost:4000/rubick').then(function (response) {
            return response.data
        });

        expect(mock.history.get[0].url).toEqual('http://localhost:4000/rubick')
        expect(result.data).toEqual(data);
    })

    it('should delete one row when api gets called', async () => {
        let keys = '1'
        mock.onDelete('http://localhost:4000/rubick/delete').reply(200, {
            data: [...data.filter(tempdata => keys.indexOf(tempdata.key) < 0)]
        });
        let result = await axiosApi.delete('http://localhost:4000/rubick/delete', { data: { keys: '1' } }).then((res) => {
            return res
        })
        expect(result.data.data).toHaveLength(3)
    })

    it('should return empty array if error occurred', async () => {
        mock.onGet('http://localhost:4000/rubick/').networkErrorOnce();
        let result = await axiosApi.get('http://localhost:4000/rubick/').then((res) => {
            return res
        }).catch((error) => { return [] });
        expect(result).toEqual([]);
    })

    it('should call setDataMock on execution', async () => {
        let setDataMock = jest.fn();
        mock.onGet('http://localhost:4000/rubick').reply(200, {
            data: data,
        });
        await axiosApi.get('http://localhost:4000/rubick').then(function (res) {
            setDataMock()
            expect(setDataMock).toHaveBeenCalledTimes(1)
        });
    })

})