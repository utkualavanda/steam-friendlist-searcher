import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Button from './Button';


configure({ adapter: new Adapter() });

describe('<Button/>', () => {
    it('should call the function passed by props after clicking', () => {
        const mockFunc = jest.fn();
        const wrapper = shallow(<Button onClick={mockFunc}/>);
        wrapper.find('button').simulate('click');
        expect(mockFunc).toHaveBeenCalled();
    })
})