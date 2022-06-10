import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const MyModal = (props) => {

	const [IV, setIV] = useState({
		title: '',
		desc: ''
	})

	const changeIV = (e) => {
		setIV(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const toPublish = () => {
		props.createPost(IV)
		props.setmodalShow(false)
	}

	return (
		<Modal
			show={props.show}
			onHide={() => props.setmodalShow(false)}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Adding a post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control name="title" value={IV.title} onChange={changeIV} type="text" placeholder="Tell me something" />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control name="desc" value={IV.desc} onChange={changeIV} placeholder="Tell me something" as="textarea" rows={3} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => props.setmodalShow(false)}>
					Close
				</Button>
				<Button onClick={toPublish} variant="primary">To publish</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default MyModal