import { Component } from 'react';

export class FieldLayout extends Component {
	render() {
		return (
			<div className="font-sans grid grid-cols-[repeat(3,_20vmin)] grid-rows-[repeat(3,_20vmin)]">
				{this.props.field.map((cell, idx) => (
					<div
						key={idx}
						onClick={() => this.props.onCellClick(idx)}
						className="flex justify-center items-center text-[10vmin] cursor-pointer border-x-[calc(20vmin/100)] border-y-[calc(20vmin/100)] border-solid border-black [&:nth-child(-n+6)]:border-b-0 [&:not(:nth-child(3n))]:border-r-0"
					>
						{cell}
					</div>
				))}
			</div>
		);
	}
}
