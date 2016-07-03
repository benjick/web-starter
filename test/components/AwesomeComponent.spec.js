import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import AwesomeComponent from '../../src/components/AwesomeComponent';

test('Can be clicked on', async t => {
  const wrapper = shallow(<AwesomeComponent />);
  t.is(+wrapper.find('#likes').text(), 0);
  wrapper.find('#like').simulate('click');
  wrapper.find('#like').simulate('click');
  t.is(+wrapper.find('#likes').text(), 2);
});
