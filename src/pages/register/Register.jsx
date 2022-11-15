import './register.scss';
import EduMatesLogo from '../../assets/images/EduMates.svg';
import DefaultAvatar from '../../assets/images/Default-avatar.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { TopicsContext } from '../../context/TopicsContext';
import { RiImageAddFill } from 'react-icons/ri';
import coursesapi from './../../coursesAPI/coursesapi';

export const Register = () => {
	const animatedComponents = makeAnimated();
	const [avatarSrc, setAvatarSrc] = useState(DefaultAvatar);
	const { topicsOptions } = useContext(TopicsContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const navigate = useNavigate();

	const getBase64 = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file); // Get The Data As Base64
		reader.onload = function () {
			const base64URL = reader.result; // Base64 URL
			setAvatarSrc(base64URL);
		};
	};

	const onRegistSubmit = async (userData) => {
		// User Data
		const displayName = userData.name.toLowerCase();
		const email = userData.email;
		const password = userData.password;
		const avatarImg = userData.avatarFile[0];
		const bDate = userData.brithdate;
		const userTopics = userData.select?.map((topic) => topic.label) || [topicsOptions[0].label, topicsOptions[1].label];
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			// Name of Image In Storage [saved by username]
			if (avatarImg) {
				const storageRef = ref(storage, displayName);
				const uploadTask = uploadBytesResumable(storageRef, avatarImg);
				uploadTask.on(
					(error) => {
						console.error(error);
					},
					() => {
						// EveryThing is Okay and Avatar File Uploaded
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							});

							// Set users to collection
							await setDoc(doc(db, 'users', res.user.uid), {
								//Properties Store In User Collection
								uid: res.user.uid,
								displayName,
								email,
								login: { isLoggedIn: true, date: Timestamp.now() },
								systemFlags: { isSystemProfile: false, isSystemBot: false },
								specialFlags: { isOwner: false, isVerified: false, isInstructor: false, isDeveloper: false, isBugHunter: false, isPremium: false },
								photoURL: downloadURL,
								coverURL:
									'https://firebasestorage.googleapis.com/v0/b/edumates---graduation-project.appspot.com/o/287f5db0-c12a-4d0b-a586-92728f497052?alt=media&token=d4feb1f2-5c23-4891-8c0e-dc2fd7c0be05',
								description: '',
								bDate,
								userTopics,
								matesList: [res.user.uid],
								unseenNotifies: [],
								seenNotifies: [],
							});

							// Create User Chat Collection
							await setDoc(doc(db, 'userChats', res.user.uid), {
								//Object is Empty Because User Don't have any conversions yet
							});

							// Create User Classroom Collection      {JSON}
							await setDoc(doc(db, 'userClassroom', res.user.uid), {
								//Object is Empty Because User Doesn't have any Courses yet
							});

							// Create users object in json server
							await coursesapi.post('/users', {
								id: res.user.uid,
								courses: [],
							});

							// After All Operations Go To Home Page
							navigate('/eduMates');
							window.location.reload(false);
						});
					},
				);
			} else {
				// Set users to collection
				await setDoc(doc(db, 'users', res.user.uid), {
					//Properties Store In User Collection
					uid: res.user.uid,
					displayName,
					email,
					login: { isLoggedIn: true, date: Timestamp.now() },
					systemFlags: { isSystemProfile: false, isSystemBot: false },
					specialFlags: { isOwner: false, isVerified: false, isInstructor: false, isDeveloper: false, isBugHunter: false, isPremium: false },
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/edumates---graduation-project.appspot.com/o/Default-avatar.jpg?alt=media&token=e466ecc4-7260-4f1a-996d-b245e89c2281',
					coverURL:
						'https://firebasestorage.googleapis.com/v0/b/edumates---graduation-project.appspot.com/o/287f5db0-c12a-4d0b-a586-92728f497052?alt=media&token=d4feb1f2-5c23-4891-8c0e-dc2fd7c0be05',
					description: '',
					bDate,
					userTopics,
					matesList: [res.user.uid],
					unseenNotifies: [],
					seenNotifies: [],
				});

				// Create User Chat Collection
				await setDoc(doc(db, 'userChats', res.user.uid), {
					//Object is Empty Because User Don't have any conversions yet
				});

				// Create User Classroom Collection
				await setDoc(doc(db, 'userClassroom', res.user.uid), {
					//Object is Empty Because User Doesn't have any Courses yet
				});

				// Create users object in json server
				await coursesapi.post('/users', {
					id: res.user.uid,
					courses: [],
				});

				// After All Operations Go To Home Page
				navigate('/eduMates');
				window.location.reload(false);
			}
		} catch (error) {
			// console.error(error.message);
			setRegistError(error.message);
		}
	};

	//Validation Flags
	const [nameTouched, setNameTouched] = useState(false);
	const [registError, setRegistError] = useState();
	const [emailValue, setEmailValue] = useState('');
	const [emailTouched, setEmailTouched] = useState(false);
	const [passTouched, setPassTouched] = useState(false);
	const [confPassTouched, setConfPassTouched] = useState(false);
	const [topicsIsEmpty, setTopicsIsEmpty] = useState(false);
	const [brithDateValidation, setBrithDateValidation] = useState(false);
	return (
		<div className='form_container'>
			<div className='text-center'>
				<img src={EduMatesLogo} alt='edumatesLogo' />
			</div>
			<div className='register_form '>
				<h2 className='form_head'>Join Us!</h2>
				<div className='user_avatar mb-4 mt-2'>
					<img className='w-100' src={avatarSrc} alt='userAvatar' />
				</div>
				<Form onSubmit={handleSubmit(onRegistSubmit)} id='signUp'>
					{/*Full Name*/}
					<Form.Group className='mb-3' controlId='formBasicName'>
						<Form.Control
							type='text'
							placeholder='Full Name'
							{...register('name', {
								required: true,
								maxLength: 20,
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setNameTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setNameTouched(true);
									} else {
										setNameTouched(false);
									}
								},
							})}
						/>
						{nameTouched && errors?.name?.type !== 'required' && <p className='font-weight text-danger mt-1 mb-0'>Name is required</p>}
						{errors?.name?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Name is required</p>}
						{errors?.name?.type === 'maxLength' && <p className='font-weight text-danger mt-1 mb-0'>Name must contain maximum 20 letters</p>}
					</Form.Group>

					{/*Email Address*/}
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Control
							type='email'
							placeholder='Email address'
							{...register('email', {
								required: true,
								pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
								onChange: (e) => {
									setEmailValue(e.target.value);
									setRegistError('');
									if (e.target.value.trim() === '') {
										setRegistError('');
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
						{errors?.email?.type !== 'pattern' && registError === 'Firebase: Error (auth/email-already-in-use).' && emailValue.trim() !== '' && (
							<p className='font-weight text-danger mt-1 mb-0'>This email already in EduMates</p>
						)}
					</Form.Group>

					{/*Brith date*/}
					{/*"2022-11-04" */}
					<Form.Group className='mb-3' controlId='formBasicDate'>
						<Form.Control
							className='brith_date'
							type='text'
							onFocus={(e) => (e.target.type = 'date')}
							onBlur={(e) => (e.target.type = 'text')}
							name='brithdate'
							placeholder='Select Brith Date                                     📅'
							{...register('brithdate', {
								required: true,
								validate: (value) => new Date(value).getFullYear() <= 2003 && new Date(value).getFullYear() >= 1930,
								onChange: (e) => {
									setBrithDateValidation(new Date(e.target.value).getFullYear() >= 2005 || new Date(e.target.value).getFullYear() <= 1930);
								},
							})}
						/>
						{brithDateValidation && <p className='font-weight text-danger mt-1 mb-0'>Select valid brith date [13 years and above] </p>}
						{errors?.brithdate?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Select your brith date</p>}
					</Form.Group>

					{/*Password*/}
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', {
								required: true,
								pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
						{errors?.password?.type === 'pattern' && (
							<p className='font-weight text-danger mt-1 mb-0'>
								Password must contains Min. 8 characters <br />
								including [a_zA_Z0_9] and special characters.
							</p>
						)}
					</Form.Group>

					{/*Confirm Password*/}
					<Form.Group className='mb-3' controlId='formBasicConfPassword'>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							{...register('confirmPassword', {
								required: true,
								validate: (value) => value === watch('password'),
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setConfPassTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setConfPassTouched(true);
									} else {
										setConfPassTouched(false);
									}
								},
							})}
						/>
						{confPassTouched && errors?.confirmPassword?.type !== 'required' && (
							<p className='font-weight text-danger mt-1 mb-0'>Confirm Password is required</p>
						)}
						{errors?.confirmPassword?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Confirm Password is required</p>}
						{errors?.confirmPassword?.type === 'validate' && <p className='font-weight text-danger mt-1 mb-0'>Password Not Matched !</p>}
					</Form.Group>

					{/*Select Topics*/}
					<Form.Group className='mb-3 select_topics' controlId='formBasicSelect'>
						<Controller
							name='select'
							control={control}
							render={({ field }) => (
								<Select
									placeholder='Select Topics'
									{...field}
									options={topicsOptions}
									closeMenuOnSelect={false}
									components={animatedComponents}
									defaultValue={[topicsOptions[0], topicsOptions[1]]}
									isMulti
								/>
							)}
							rules={{
								required: topicsIsEmpty,
								onChange: (e) => {
									if (Object.keys(e.target.value).length === 0) {
										setTopicsIsEmpty(true);
									} else {
										setTopicsIsEmpty(false);
									}
								},
							}}
						/>
						{topicsIsEmpty && errors?.select?.type === 'required' && (
							<p className='font-weight text-danger mt-1 mb-0'>Please pick your favorite topics</p>
						)}
					</Form.Group>

					{/*Agree To Terms And Conditions CheckBox*/}
					<Form.Group className='my-3 d-flex flex-column align-items-center' controlId='formBasicCheckbox'>
						<Form.Check
							type='checkbox'
							label='Agree To Terms And Conditions'
							{...register('agreeTerms', {
								required: true,
							})}
						/>

						{errors?.agreeTerms?.type === 'required' && <p className='font-weight text-danger mt-2'>You must agree on our Terms and Conditions</p>}
					</Form.Group>

					{/*Avatar*/}
					<Form.Group className='mb-3'>
						<Form.Control style={{ display: 'none' }} type='file' id='file' accept='image/*' {...register('avatarFile', { onChange: getBase64 })} />
						<Form.Label htmlFor='file'>
							{/* <img src={AddAvatar} alt='addAvatar' /> */}
							<span className='fs-6 d-flex justify-content-center align-items-center pointer'>
								<RiImageAddFill className='fs-4 me-2' /> Select your avatar <p className='text-danger mt-4 p-0 ps-2 badge'>Optional</p>
							</span>
						</Form.Label>
					</Form.Group>

					{/*Submit Button*/}
					<Button variant='primary' type='submit'>
						Sign Up
					</Button>
				</Form>
			</div>

			<p className='text-center'>
				Already in EduMates?{' '}
				<Link to='/login' className='fw-bolder'>
					Login
				</Link>
			</p>
		</div>
	);
};
