import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useState } from 'react';

export const ForgetPassModal = ({ show, handelShowState }) => {
	const [email, setEmail] = useState('');
	const [sent, setSent] = useState(false);

	const handelShowModal = (flag) => {
		handelShowState(flag);
	};

	const handleResetPassword = () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setSent(true);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
	};

	return (
		<>
			<Modal
				show={show}
				onShow={() => {
					setSent(false);
					setEmail('');
				}}
				onHide={() => {
					handelShowModal(false);
				}}>
				<Modal.Header closeButton className={sent ? 'd-flex' : 'd-none'}></Modal.Header>
				<Modal.Body>
					<div className={sent ? 'd-none' : 'd-block'}>
						<Form>
							<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
								<Form.Label>Email address</Form.Label>
								<Form.Control type='email' placeholder='name@example.com' autoFocus onChange={(e) => setEmail(e.target.value)} />
							</Form.Group>
						</Form>
					</div>
					<div className={sent ? 'd-block' : 'd-none'}>
						<p className='text-primary'>
							A reset password email has been sent successfully to your email <span className='d-block text-danger fw-bolder py-3 text-center'>{email}</span>
							<span className='d-flex justify-content-center align-items-center mb-0 pb-0'>
								<span className='badge bg-warning'>Please Check your inbox and your spam messages</span>
							</span>
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer className={sent ? 'd-none' : 'd-flex'}>
					<Button variant='secondary' onClick={() => handelShowModal(false)}>
						Discard
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							handleResetPassword();
						}}>
						Reset Password
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
