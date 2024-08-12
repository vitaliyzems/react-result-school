import { connect } from 'react-redux';
import { FieldLayout } from './FieldLayout';
import { setCurrentPlayer, setField } from '../../store/actions';
import { Component } from 'react';

class FieldContainer extends Component {
	onCellClick = (cellIdx) => {
		if (this.props.field[cellIdx] || this.props.isGameEnded) {
			return;
		}
		const newField = this.props.field.map((cell, idx) =>
			cellIdx === idx ? this.props.currentPlayer : cell,
		);
		this.props.setFieldAction(newField);
		const newCurrentPlayer = this.props.currentPlayer === 'X' ? 'O' : 'X';
		this.props.setCurrentPlayerAction(newCurrentPlayer);
	};

	render() {
		return <FieldLayout field={this.props.field} onCellClick={this.onCellClick} />;
	}
}

const mapStateToProps = (state) => ({
	field: state.field.field,
	currentPlayer: state.player.currentPlayer,
	isGameEnded: state.game.isGameEnded,
});

const mapDispatchToProps = (dispatch) => ({
	setFieldAction: (newField) => dispatch(setField(newField)),
	setCurrentPlayerAction: (newCurrentPlayer) =>
		dispatch(setCurrentPlayer(newCurrentPlayer)),
});

export const Field = connect(mapStateToProps, mapDispatchToProps)(FieldContainer);
