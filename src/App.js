import { useState } from 'react';
import styles from './App.module.css';

const buttons = ['0', '=', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '+', '-'];

const formatString = (str) => {
	return Intl.NumberFormat('Ru-ru').format(str);
};

const getCorrectClassName = (value) => {
	if (value === '0') {
		return 'zero';
	}
	if (value === '=') {
		return 'equal';
	}
	if (isNaN(Number(value))) {
		return 'action';
	} else {
		return '';
	}
};

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('');

	const isMaxNumberInput =
		(operand1.length === 9 && !operator) || operand2.length === 9;
	const isZeroInInput = (operand1 === '0' && !operator) || operand2 === '0';

	const getResult = () => {
		return String(operator === '+' ? +operand1 + +operand2 : operand1 - operand2);
	};

	const clearInput = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
	};

	const getDisplayValue = () => {
		if (!operand1) {
			return '0';
		} else if (!operator) {
			return formatString(operand1);
		} else if (operator && !operand2) {
			return `${formatString(operand1)} ${operator}`;
		} else {
			return `${formatString(operand1)} ${operator} ${formatString(operand2)}`;
		}
	};

	const onActionButtonClick = (value) => {
		if (value === 'C') {
			clearInput();
			setResult('');
		} else if (result) {
			setOperand1(result);
			setOperator(value);
			setResult('');
		} else if (!operand1) {
			setOperand1('0');
			setOperator(value);
		} else if (operand2) {
			const result = getResult();
			setOperand1(result);
			setOperator(value);
			setOperand2('');
		} else {
			setOperator(value);
		}
	};

	const onEqualButtonClick = () => {
		if (operand2) {
			const resultValue = getResult();
			setResult(resultValue);
			clearInput();
		}
	};

	const onNumButtonClick = (value) => {
		if (isMaxNumberInput) {
			return;
		}
		if (value === '0' && isZeroInInput) {
			return;
		}
		if (result) {
			setResult('');
		}
		if (!operator) {
			setOperand1((prev) => prev + value);
		} else {
			setOperand2((prev) => prev + value);
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.calculator}>
				<div
					className={
						result ? styles.result + ' ' + styles.active : styles.result
					}
				>
					{result ? formatString(result) : getDisplayValue()}
				</div>
				<ul className={styles.buttons}>
					{buttons.map((button) => {
						const className = getCorrectClassName(button);
						return (
							<li
								key={button}
								className={
									className
										? styles.button + ' ' + styles[className]
										: styles.button
								}
							>
								<div
									onClick={
										className === 'action'
											? () => onActionButtonClick(button)
											: className === 'equal'
												? () => onEqualButtonClick()
												: () => onNumButtonClick(button)
									}
								>
									{button}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
