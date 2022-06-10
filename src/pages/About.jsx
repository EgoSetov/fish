import { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import Post from "../components/Post"
import { useFireBaseEvents } from "../hooks/use-firebase-events"
import Modal from '../components/Modal'

const About = () => {

	const user = useSelector(state => state.user)

	const [posts, setPosts] = useState([])
	const [modalShow, setmodalShow] = useState(false)

	const [IV, setIV] = useState({
		comment: ''
	})

	const changeIV = (e) => {
		setIV(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const { loading, getItems, addItem, addComment } = useFireBaseEvents('posts')

	useEffect(() => {
		(async () => {
			const res = await getItems()
			if (res?.status === 'SUCCESS') {
				setPosts(res.items)
			} else {
				alert('Не удалось загрузить данные')
			}
		})()
	}, [])

	const createPost = async (data) => {
		const {title, desc} = data
		const res = await addItem({
			comments: [],
			desc,
			title,
			user: {
				id: user.id,
				name: user.email
			}
		})
		if (res.status === 'ADDED') {
			setPosts(prev => [...prev, res.newItem])
		}
	}

	const addPostComment = async (idPost) => {
		const res = await addComment(idPost, { user: { id: user.id, name: user.email }, comment: IV.comment })
		if (res.status === 'ADDED') {
			const newPosts = posts.map(post => {
				if (post.id === idPost) {
					return {
						...post,
						comments: [
							...post.comments,
							res.item
						]
					}
				} else return post
			})
			setPosts(newPosts)
			setIV(prev => ({
				...prev,
				comment: ''
			}))
		}
	}

	return (
		<div className="container pageAbout">
			<div className="pageAbout-title">
				<h1>About</h1>
				{user.id ? <Button onClick={() => setmodalShow(true)} variant="success">Добавить</Button> : ''}
			</div>
			{loading ?
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
				:
				<div>
					<div className="cards">
						{posts.map(post => (
							< Post changeIV={changeIV} IV={IV} post={post} key={post.id} addPostComment={addPostComment} />
						))}
					</div>
				</div>
			}
			<Modal createPost={createPost} show={modalShow} setmodalShow={setmodalShow} />
		</div>
	)
}

export default About
