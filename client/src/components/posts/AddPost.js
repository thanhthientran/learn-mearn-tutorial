import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {

    //Context
    const { addNewPost, showAddPostModal, setShowAddPostModal} = useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '' })
        setShowAddPostModal(false)
    }

    const { title, description, url } = newPost
    const onChangeNewPostForm = e => setNewPost({ ...newPost, [e.target.name]: e.target.value })

    //AddPost
    const onSubmit = async e => {
        e.preventDefault()
        const { success, message } = await addNewPost(newPost)
        if (success) {
            closeDialog()
        }
        else{
            e.preventDefault();
            console.error(message)}
    }

    return (
        <>
            <Modal show={showAddPostModal} onHide={closeDialog} >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Add Post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" 
                            placeholder="Title" 
                            name="title" 
                            required 
                            aria-describedby="title-help"  
                            value={title} 
                            onChange={onChangeNewPostForm}/>
                            <Form.Text id='titel-help' muted >Required</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                            as='textarea' row={3} 
                            placeholder="Enter description" 
                            name="description"  
                            value={description} 
                            onChange={onChangeNewPostForm}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Url" 
                            name="url"  
                            value={url} 
                            onChange={onChangeNewPostForm}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default AddPostModal