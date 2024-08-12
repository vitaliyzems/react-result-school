import { Component } from 'react';

export class InformationLayout extends Component {
	render() {
		return (
			<div className="py-[1vmin] px-0 text-[5vmin] flex items-center">
				{!this.props.isGameEnded && (
					<div className="px-[5vmin] py-0">
						Сейчас ходит: {this.props.currentPlayer}
					</div>
				)}
				{this.props.isGameEnded && !this.props.isDraw && (
					<div className="px-[5vmin] py-0">
						Победил: {this.props.currentPlayer === 'X' ? 'O' : 'X'}
					</div>
				)}
				{this.props.isDraw && <div className="px-[5vmin] py-0">Ничья</div>}
				{this.props.isGameEnded && (
					<button
						className="bg-[#3f686a] text-white text-[5vmin] border-none rounded-[1vmin] px-[5vmin] py-[1vmin] cursor-pointer [&:hover]:bg-[#2d4c4e]"
						onClick={this.props.onRepeatButtonClick}
					>
						Заново
					</button>
				)}
			</div>
		);
	}
}
