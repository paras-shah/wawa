import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('shows Header', () => {
	const wrapped = shallow(<App />);
	console.log('wrapped.find(Homepage)');
});
