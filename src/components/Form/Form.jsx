import { useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFormError } from '../../hooks/useFormError';
import { checkMaxLength, checkMinLength, testEmail } from '../../utils/validate';
import styles from './Form.module.css';

const sendForm = (formData) => {
	console.log(formData);
};

export const Form = () => {
	const { getFormData, updateFormData } = useForm();
	const { getFormError, updateFormError } = useFormError();

	const { email, password, confirmPassword } = getFormData();
	const { emailError, passwordError, confirmPasswordError } = getFormError();

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		updateFormData('email', target.value);

		if (testEmail(target.value)) {
			updateFormError('emailError', null);
		}
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;

		if (!testEmail(target.value)) {
			newError = 'Введите корректный Email';
		}

		updateFormError('emailError', newError);
	};

	const onPasswordChange = ({ target }) => {
		updateFormData('password', target.value);
		updateFormData('confirmPassword', '');
		updateFormError('confirmPasswordError', null);

		let newError = null;

		if (!checkMaxLength(target.value, 20)) {
			newError = 'Максимальная длина 20 символов';
		}

		updateFormError('passwordError', newError);
	};

	const onPasswordBlur = ({ target }) => {
		if (!checkMinLength(target.value, 6)) {
			updateFormError('passwordError', 'Минимальная длина 6 символов');
		}
	};

	const onConfirmPasswordChange = ({ target }) => {
		updateFormData('confirmPassword', target.value);
		updateFormError('confirmPasswordError', null);
		if (target.value === password) {
			submitButtonRef.current.focus();
		}
	};

	const onConfirmPasswordBlur = ({ target }) => {
		if (password !== target.value) {
			updateFormError('confirmPasswordError', 'Пароли не совпадают');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		let error = false;
		if (!email) {
			error = true;
			updateFormError('emailError', 'Обязательное поле');
		}
		if (!password) {
			error = true;
			updateFormError('passwordError', 'Обязательное поле');
		}
		if (!confirmPassword) {
			error = true;
			updateFormError('confirmPasswordError', 'Обязательное поле');
		}
		if (error) {
			return;
		}
		const formData = {
			email: email.toLowerCase(),
			password,
			confirmPassword,
		};
		sendForm(formData);
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input
				autoComplete="email"
				placeholder="Ваш Email"
				type="text"
				name="email"
				id="email"
				value={email}
				onChange={onEmailChange}
				onBlur={onEmailBlur}
			/>
			{emailError ? <span>{emailError}</span> : <span />}
			<input
				autoComplete="new-password"
				placeholder="Введите пароль"
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={onPasswordChange}
				onBlur={onPasswordBlur}
			/>
			{passwordError ? <span>{passwordError}</span> : <span />}
			<input
				autoComplete="new-password"
				placeholder="Повторите пароль"
				type="password"
				name="confirmPassword"
				id="confirmPassword"
				value={confirmPassword}
				onChange={onConfirmPasswordChange}
				onBlur={onConfirmPasswordBlur}
			/>
			{confirmPasswordError ? <span>{confirmPasswordError}</span> : <span />}
			<input
				ref={submitButtonRef}
				disabled={emailError || passwordError || confirmPasswordError}
				type="submit"
				value="Зарегистрироваться"
			/>
		</form>
	);
};
