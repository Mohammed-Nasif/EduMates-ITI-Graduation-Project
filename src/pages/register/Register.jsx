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

export const Register = () => {
	const animatedComponents = makeAnimated();

	const [avatarSrc, setAvatarSrc] = useState(DefaultAvatar);

	const { topicsOptions } = useContext(TopicsContext);

	const {
		register,
		handleSubmit,
		// formState: { errors },
		control,
		// watch,
	} = useForm();

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
		const userTopics = userData.select?.map((topic) => topic.label);
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
								specialFlags: { isAdmin: false, isVerified: false, isInstructor: false },
								photoURL: downloadURL,
								coverURL:
									'https://firebasestorage.googleapis.com/v0/b/edumates---graduation-project.appspot.com/o/287f5db0-c12a-4d0b-a586-92728f497052?alt=media&token=d4feb1f2-5c23-4891-8c0e-dc2fd7c0be05',
								description: '',
								bDate,
								userTopics,
								matesList: [res.user.uid],
								unseenNotifies: [],
								seenNotifies: [],
								mgsNotifies: [],
							});

							// Create User Chat Collection
							await setDoc(doc(db, 'userChats', res.user.uid), {
								//Object is Empty Because User Don't have any conversions yet
							});

							// Create User Classroom Collection      {JSON}
							await setDoc(doc(db, 'userClassroom', res.user.uid), {
								//Object is Empty Because User Doesn't have any Courses yet
							});

							// After All Operations Go To Home Page
							navigate('/eduMates/home');
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
					specialFlags: { isAdmin: false, isVerified: false, isInstructor: false },
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
					mgsNotifies: [],
				});

				// Create User Chat Collection
				await setDoc(doc(db, 'userChats', res.user.uid), {
					//Object is Empty Because User Don't have any conversions yet
				});

				// Create User Classroom Collection
				await setDoc(doc(db, 'userClassroom', res.user.uid), {
					//Object is Empty Because User Doesn't have any Courses yet
				});

				// After All Operations Go To Home Page
				navigate('/eduMates/home');
			}
		} catch (error) {
			console.error(error);
		}
	};

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
								// required: true,
								// maxLength: 20,
							})}
						/>

						{/* {errors?.name?.type === 'required' && <p className='font-weight text-danger mt-2'>Name is required</p>}
					{errors?.name?.type === 'maxLength' && <p className='font-weight text-danger mt-2'>Name must contain maximum 20 letters</p>} */}
					</Form.Group>

					{/*Email Address*/}
					<Form.Group className='mb-3' controlId='formBasicEmail'>
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

					{/*Brith date*/}
					<Form.Group className='mb-3' controlId='formBasicDate'>
						<Form.Control
							className='brith_date'
							type='text'
							onFocus={(e) => (e.target.type = 'date')}
							onBlur={(e) => (e.target.type = 'text')}
							name='brithdate'
							placeholder='Select Brith Date                                     📅'
							{...register('brithdate', {
								// required: true,
							})}
						/>
					</Form.Group>

					{/*Password*/}
					<Form.Group className='mb-3' controlId='formBasicPassword'>
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

					{/*Confirm Password*/}
					<Form.Group className='mb-3' controlId='formBasicConfPassword'>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							{...register('confirmPassword', {
								// required: true,
								// validate: (value) => value === watch('password'),
							})}
						/>

						{/* {errors?.confirmPassword?.type === 'required' && <p className='font-weight text-danger mt-2'>Confirm Password is required</p>}
					{errors?.confirmPassword?.type === 'validate' && <p className='font-weight text-danger mt-2'>Password Not Matched !</p>} */}
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
									// defaultValue={[topicsOptions[0], topicsOptions[1]]}
									isMulti
								/>
							)}
							// rules={{ required: true }}
						/>

						{/* {errors?.select?.type === 'required' && <p className='font-weight text-danger mt-2'>Please select your title</p>} */}
					</Form.Group>

					{/*Agree To Terms And Conditions CheckBox*/}
					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check
							type='checkbox'
							label='Agree To Terms And Conditions'
							{...register('agreeTerms', {
								// required: true,
							})}
						/>

						{/* {errors?.agreeTerms?.type === 'required' && <p className='font-weight text-danger mt-2'>You must agree on Terms and Conditions</p>} */}
					</Form.Group>

					{/*Avatar*/}
					<Form.Group className='mb-3'>
						<Form.Control style={{ display: 'none' }} type='file' id='file' accept='image/*' {...register('avatarFile', { onChange: getBase64 })} />
						<Form.Label htmlFor='file'>
							{/* <img src={AddAvatar} alt='addAvatar' /> */}
							<span>Add an avatar</span>
						</Form.Label>
					</Form.Group>

					{/*Submit Button*/}
					<Button variant='primary' type='submit'>
						Sign Up
					</Button>
				</Form>
			</div>

			<p className='text-center'>
				Already on EduMates?{' '}
				<Link to='/login' className='fw-bolder'>
					Login
				</Link>{' '}
			</p>
		</div>
	);
};
