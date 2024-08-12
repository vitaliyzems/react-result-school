import { AppLayout } from './AppLayout';
import { connect } from 'react-redux';
import { setIsDraw, setIsGameEnded } from '../../store/actions';
import { Component } from 'react';
import { checkVictory } from '../../utils';

class AppContainer extends Component {
	componentDidUpdate() {
		if (
			!this.isGameEnded &&
			(checkVictory(this.props.field) ||
				!this.props.field.some((cell) => cell === ''))
		) {
			this.props.setIsGameEndedAction(true);
		}
		if (
			!this.props.isDraw &&
			this.props.isGameEnded &&
			!checkVictory(this.props.field)
		) {
			this.props.setIsDrawAction(true);
		}
	}
	render() {
		return <AppLayout />;
	}
}

const mapStateToProps = (state) => ({
	field: state.field.field,
	isGameEnded: state.game.isGameEnded,
	isDraw: state.game.isDraw,
});

const mapDispatchToProps = (dispatch) => ({
	setIsGameEndedAction: (isGameEnded) => dispatch(setIsGameEnded(isGameEnded)),
	setIsDrawAction: (isDraw) => dispatch(setIsDraw(isDraw)),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
