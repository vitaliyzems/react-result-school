import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

export const useForm = () => {
	const [formData, setFormData] = useState(initialState);

	return {
		getFormData: () => formData,
		updateFormData: (fieldName, newValue) => {
			setFormData((prev) => ({ ...prev, [fieldName]: newValue }));
		},
	};
};
