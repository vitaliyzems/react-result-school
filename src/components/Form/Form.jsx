import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { yupResolver } from '@hookform/resolvers/yup';

const sendForm = (formData) => {
	console.log(formData);
};

const defaultValues = { email: '', password: '', confirmPassword: '' };

const fieldSchema = yup.object().shape({
	email: yup.string().required('Обязательное поле').email('Введите корректный Email'),
	password: yup
		.string()
		.required('Обязательное поле')
		.min(6, 'Минимальная длина 6 символов')
		.max(20, 'Максимальная длина 20 символов'),
	confirmPassword: yup
		.string()
		.required('Обязательное поле')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(fieldSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	return (
		<form className={styles.form} onSubmit={handleSubmit(sendForm)}>
			<input
				autoComplete="email"
				placeholder="Ваш Email"
				type="text"
				name="email"
				{...register('email')}
			/>
			{emailError ? <span>{emailError}</span> : <span />}
			<input
				autoComplete="new-password"
				placeholder="Введите пароль"
				type="password"
				name="password"
				{...register('password')}
			/>
			{passwordError ? <span>{passwordError}</span> : <span />}
			<input
				autoComplete="new-password"
				placeholder="Повторите пароль"
				type="password"
				name="confirmPassword"
				{...register('confirmPassword')}
			/>
			{confirmPasswordError ? <span>{confirmPasswordError}</span> : <span />}
			<input
				disabled={!!emailError || !!passwordError || !!confirmPasswordError}
				type="submit"
				value="Зарегистрироваться"
			/>
		</form>
	);
};
