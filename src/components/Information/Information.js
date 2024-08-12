import { connect } from 'react-redux';
import { InformationLayout } from './InformationLayout';
import {
	setCurrentPlayer,
	setField,
	setIsDraw,
	setIsGameEnded,
} from '../../store/actions';
import { Component } from 'react';

class InformationContainer extends Component {
	onRepeatButtonClick = () => {
		this.props.setCurrentPlayerAction('X');
		this.props.setIsGameEndedAction(false);
		this.props.setIsDrawAction(false);
		this.props.setFieldAction(Array(9).fill(''));
	};

	render() {
		return (
			<InformationLayout
				currentPlayer={this.props.currentPlayer}
				isGameEnded={this.props.isGameEnded}
				isDraw={this.props.isDraw}
				onRepeatButtonClick={this.onRepeatButtonClick}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.player.currentPlayer,
	isGameEnded: state.game.isGameEnded,
	isDraw: state.game.isDraw,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentPlayerAction: (newCurrentPlayer) =>
		dispatch(setCurrentPlayer(newCurrentPlayer)),
	setIsGameEndedAction: (isGameEnded) => dispatch(setIsGameEnded(isGameEnded)),
	setIsDrawAction: (isDraw) => dispatch(setIsDraw(isDraw)),
	setFieldAction: (newField) => dispatch(setField(newField)),
});

export const Information = connect(
	mapStateToProps,
	mapDispatchToProps,
)(InformationContainer);
