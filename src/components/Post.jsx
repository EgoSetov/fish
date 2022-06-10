import React from 'react'
import { Card, Button, InputGroup, Form } from "react-bootstrap"

const Post = (props) => {

	const { post: { id, title, desc, user, comments }, changeIV, IV, addPostComment } = props

	return (
		<Card>
			<Card.Header>{user?.name}</Card.Header>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>
					{desc}
				</Card.Text>
				{comments.length ?
					<>
						<hr />
						<div className="comments">
							{comments?.map(com => (
								<Card key={com.id}>
									<Card.Body>{com.user.name} | {com.comment}</Card.Body>
								</Card>
							))}
						</div>
					</>
					: ''}
				<Card.Footer>
					<InputGroup className="mb-3">
						<Form.Control
							value={IV.comment}
							onChange={changeIV}
							name="comment"
							placeholder="Write what you think"
							aria-label="Write what you think"
							aria-describedby="basic-addon2"
						/>
						<Button onClick={() => addPostComment(id)} variant="outline-success" id="button-addon2">
							Send
						</Button>
					</InputGroup>
				</Card.Footer>
			</Card.Body>
		</Card>
	)
}

export default Post