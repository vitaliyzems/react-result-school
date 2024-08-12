import { Information } from '../Information/Information';
import { Field } from '../Field/Field';
import { Component } from 'react';

export class AppLayout extends Component {
	render() {
		return (
			<div className="w-[100%] h-[100vh] flex flex-col justify-center items-center bg-[#5f9ea0]">
				<Information />
				<Field />
			</div>
		);
	}
}
