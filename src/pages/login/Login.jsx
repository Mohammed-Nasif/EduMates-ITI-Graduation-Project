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
import { useContext } from 'react';

export const Login = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm();

	const onLoginSubmit = async (userData) => {
		const email = userData.email;
		const password = userData.password;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			await updateDoc(doc(db, 'users', currentUser.uid), {
				login: { isLoggedIn: true, date: Timestamp.now() },
			});
			navigate('/eduMates/home');
		} catch (err) {
			console.log(err);
		}
	};

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
								// required: true,
								// pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
							})}
						/>

						{/* {errors?.email?.type === 'required' && <p className='font-weight text-danger mt-2'>Email is required</p>}
					{errors?.email?.type === 'pattern' && <p className='font-weight text-danger mt-2'>Email enter a valid email</p>} */}
						<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
					</Form.Group>

					{/*Password*/}
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', {
								// required: true,
								// pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							})}
						/>

						{/* {errors?.password?.type === 'required' && <p className='font-weight text-danger mt-2'>Password is required</p>}
					{errors?.password?.type === 'pattern' && (
						<p className='font-weight text-danger mt-2'>
							Password must contains Minimum 8 characters, at least one letter, one number and one special character.
						</p>
					)} */}
					</Form.Group>

					{/*Forget Password */}
					<p className='text-center my-3'>
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
				Not on EduMates?{' '}
				<Link to='/register' className='fw-bolder'>
					Signup
				</Link>{' '}
				<span className='fw-bold'>Now!</span>
			</p>
		</div>
	);
};
