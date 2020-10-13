import React from 'react';

import UserInfo from './UserInfo';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Spinner from '../../components/Spinner/Spinner';


configure({ adapter: new Adapter() });

describe('<UserInfo/>', () => {
    it('should render a spinner if the friendListState length does not match with usersInfoState', () => {
        const wrapper = shallow(<UserInfo friendListState={['dummy data']} />);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    })
    it('shouldn\'t render a spinner if the friendListState length matches with usersInfoState', () => {
        const wrapper = shallow(<UserInfo friendListState={[]} />);
        expect(wrapper.find(Spinner)).toHaveLength(0);
    })
})