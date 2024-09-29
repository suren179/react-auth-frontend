import * as Yup from 'yup';

export const emailValidation = Yup.string()
	.email('Invalid email address')
	.required('Required');

export const nameValidation = Yup.string()
	.required('Required')
	.max(100, 'Password must be at least 100 characters');

export const passwordValidation = Yup.string()
	.min(8, 'Password must be at least 8 characters')
	.max(128, 'Password must be at least 128 characters')
	.matches(/[a-zA-Z]/, 'Password must contain at least one letter')
	.matches(/\d/, 'Password must contain at least one number')
	.matches(
		/[!@#$%^&*(),.?":{}|<>]/,
		'Password must contain at least one special character',
	)
	.required('Required');
