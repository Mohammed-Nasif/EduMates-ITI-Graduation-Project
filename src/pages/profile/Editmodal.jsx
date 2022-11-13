import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export const Editmodal = (props) => {
	const [name, setName] = useState(props.data.displayName);
	const [description, setDescription] = useState(props.data.description);

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter' className='modal_head '>
					General Account info
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='d-flex flex-column'>
				<div className='d-flex justify-content-around align-items-center'>
					<p className='m-0 p-0 fw-bold '>Name</p>
					<input
						type='text'
						className='form-control w-25'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<hr />
				<div className='d-flex justify-content-around  align-items-center'>
					{/* <p>Description</p> */}
					<p className='p-0 m-0 fw-bold'>Description</p>
					<input
						type='text'
						className='form-control w-25 me-3'
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				<Button
					onClick={() => {
						props.onConfirm(name.toLowerCase(), description);
					}}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
