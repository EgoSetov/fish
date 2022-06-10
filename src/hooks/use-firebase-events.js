import { db, Post } from "../firebase"
import { collection, query, where, getDocs, deleteField, Firestore } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import firebase from "firebase/compat/app";

export const useFireBaseEvents = (collectionName = 'posts') => {
	const [info, setInfo] = useState({
		loading: false
	})

	collectionName = collectionName.toLowerCase()
	let Model = null
	let correctCollectionName = null

	if (collectionName === 'posts') {
		Model = Post
		correctCollectionName = collectionName[0].toLocaleUpperCase() + collectionName.slice(1)
	}
	else {
		setInfo(prev => ({
			...prev,
			status: 'NOT FOUND'
		}))
	}

	// Получение
	const getItems = async () => {
		try {
			setInfo({ loading: true })
			const res = await Model.get()
			setInfo({ loading: false })
			return {
				items: res.docs.map(doc => doc.data()),
				status: 'SUCCESS'
			}
		} catch (error) {
			setInfo({ loading: false })
			console.log(error);
			return {
				error,
				status: 'ERROR',
				items: []
			}
		}
	}

	// Добавление
	const addItem = async (data) => {
		const id = uuidv4()
		const newItem = { id, ...data }
		try {
			await Model.doc(id).set(newItem)
			return {
				status: 'ADDED',
				newItem
			}
		} catch (error) {
			console.log(error);
			return {
				error,
				status: 'ERROR',
				newItem: {}
			}
		}
	}

	// Удаление
	const removeitem = async (data) => {
		const { item_id } = data
		if (!item_id) throw new Error('id is required')

		try {
			const modelRef = collection(db, correctCollectionName)
			const q = query(modelRef, where("id", "==", item_id));
			await q.remove()
		} catch (error) {
			console.log(error);
			return {
				error,
				status: 'ERROR',
				items: []
			}
		}
	}

	// Добавление комментария
	const addComment = async (item_id, data) => {
		try {
			const id = uuidv4()
			const newComment = { id, comment: data.comment, user: data.user }
			await db.collection('Posts').doc(item_id).update({
				comments: firebase.firestore.FieldValue.arrayUnion(newComment)
			})
			return {
				status: 'ADDED',
				item: newComment
			}

		} catch (error) {
			console.log(error);
			return {
				error,
				status: 'ERROR',
				item: {}
			}
		}
	}

	return {
		loading: info.loading,
		getItems,
		addItem,
		removeitem,
		addComment
	}
}
