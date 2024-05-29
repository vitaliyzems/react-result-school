import { useState } from 'react';

const initialState = {
	emailError: null,
	passwordError: null,
	confirmPasswordError: null,
};

export const useFormError = () => {
	const [formError, setFormError] = useState(initialState);

	return {
		getFormError: () => formError,
		updateFormError: (fieldName, newValue) => {
			setFormError((prev) => ({ ...prev, [fieldName]: newValue }));
		},
	};
};
