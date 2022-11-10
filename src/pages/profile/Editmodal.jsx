import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export const Editmodal = (props) => {
	const [name, setName] = useState(props.data.displayName);
	const [description, setDescription] = useState(props.data.description);

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>General Account info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='d-flex justify-content-around'>
					<p>Name</p>
					<input
						type='text'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<hr />
				<div className='d-flex justify-content-around'>
					<p>Description</p>
					<input
						type='text'
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
						props.onConfirm(name, description);
					}}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
