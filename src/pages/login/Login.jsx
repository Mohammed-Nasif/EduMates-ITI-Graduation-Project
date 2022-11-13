import './login.scss';
import EduMatesLogo from '../../assets/images/EduMates.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { updateDoc, doc, Timestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { ForgetPassModal } from './Forgetpassmodal';
import { useCallback, useState, useContext } from 'react';

export const Login = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const [showModal, setShowModal] = useState();
	const [loginError, setLoginError] = useState();
	const [emailValue, setEmailValue] = useState('');
	const [emailTouched, setEmailTouched] = useState(false);
	const [passTouched, setPassTouched] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const onLoginSubmit = async (userData) => {
		const email = userData.email;
		const password = userData.password;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			if (currentUser) {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					login: { isLoggedIn: true, date: Timestamp.now() },
				});
			}
			navigate('/eduMates');
			window.location.reload(false);
		} catch (err) {
			// console.log(err);
			setLoginError(err.message);
		}
	};

	const handelShowState = useCallback((flag) => {
		setShowModal(flag);
	}, []);

	return (
		<div className='form_container'>
			<div className='text-center'>
				<img src={EduMatesLogo} alt='edumatesLogo' />
			</div>
			<div className='login_form'>
				<h2 className='form_head'>Welcome Back!</h2>
				<Form onSubmit={handleSubmit(onLoginSubmit)} id='login'>
					{/*Email Address*/}
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Email address'
							{...register('email', {
								required: true,
								pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
								onChange: (e) => {
									setEmailValue(e.target.value);
									if (e.target.value.trim() === '') {
										setLoginError('');
									} else {
										setEmailTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setEmailTouched(true);
									} else {
										setEmailTouched(false);
									}
								},
							})}
						/>
						<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
						{emailTouched && emailValue.trim() === '' && errors?.email?.type !== 'required' && (
							<p className='font-weight text-danger mt-1 mb-0'>Email is required</p>
						)}
						{errors?.email?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Email is required</p>}
						{errors?.email?.type === 'pattern' && <p className='font-weight text-danger mt-1 mb-0'>Email enter a valid email</p>}
						{errors?.email?.type !== 'pattern' && loginError === 'Firebase: Error (auth/user-not-found).' && emailValue.trim() !== '' && (
							<p className='font-weight text-danger mt-1 mb-0'>This email not in EduMates</p>
						)}
					</Form.Group>

					{/*Password*/}
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', {
								required: true,
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setPassTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setPassTouched(true);
									} else {
										setPassTouched(false);
									}
								},
							})}
						/>
						{passTouched && errors?.password?.type !== 'required' && <p className='font-weight text-danger mt-1 mb-0'>Password is required</p>}
						{errors?.password?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Password is required</p>}
						{loginError === 'Firebase: Error (auth/wrong-password).' && (
							<p className='font-weight text-danger mt-1 mb-0'>Please check your password again</p>
						)}
					</Form.Group>

					{/*Forget Password */}
					<p
						className='text-center my-3'
						onClick={() => {
							setShowModal(true);
						}}>
						<Link to='' className='text-decoration-none text-muted'>
							Forget Your Password ?
						</Link>
					</p>

					{/*Submit Button*/}
					<Button variant='primary' type='submit'>
						Login
					</Button>
				</Form>
			</div>
			<p className='text-center'>
				Not in EduMates?{' '}
				<Link to='/register' className='fw-bolder'>
					Signup
				</Link>{' '}
				<span className='fw-bold'>Now!</span>
			</p>
			<ForgetPassModal show={showModal} handelShowState={handelShowState} />
		</div>
	);
};
