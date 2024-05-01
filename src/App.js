import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const onGetBackButtonClick = () => {
		setActiveIndex((prev) => prev - 1);
	};

	const onNextButtonClick = () => {
		setActiveIndex((prev) => prev + 1);
	};

	const onRestartButtonClick = () => {
		setActiveIndex(0);
	};

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								className={
									index === activeIndex
										? styles['steps-item'] +
											' ' +
											styles.active +
											' ' +
											styles.done
										: index < activeIndex
											? styles['steps-item'] + ' ' + styles.done
											: styles['steps-item']
								}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onGetBackButtonClick}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={
								isLastStep ? onRestartButtonClick : onNextButtonClick
							}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
