const EMAIL_REGEXP =
	// /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	/^\w{3,}@[a-zA-Z]{2,}\.[a-z]{2,3}$/;

export const testEmail = (value) => {
	return EMAIL_REGEXP.test(value);
};

export const checkMinLength = (value, minLength) => {
	return value.length >= minLength;
};

export const checkMaxLength = (value, maxLength) => {
	return value.length <= maxLength;
};
