import { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {


    //Context
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        getPosts
    } = useContext(PostContext)


    const [updatedPost, setUpdatedPost] = useState(post)
    useEffect(() => setUpdatedPost(post), [post])


    const closeDialog = () => {
        // setNewPost({ title: '', description: '', url: '' })
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }

    const { title, description, url, status } = updatedPost
    // console.log(updatedPost)

    const onChangeUpdatedPostForm = e => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })
    }

    //UpdatePost
    const onSubmit = async e => {
        e.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        if (success) {
            closeDialog()
            getPosts()
        }
        else {
            e.preventDefault();
            console.log(message)
        }
    }

    return (
        <>
            <Modal show={showUpdatePostModal} onHide={closeDialog} >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Thông tin post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Title"
                                name="title"
                                required
                                aria-describedby="title-help"
                                value={title || ''}
                                onChange={onChangeUpdatedPostForm} />
                            <Form.Text id='titel-help' muted >Required</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as='textarea' row={3}
                                placeholder="Enter description"
                                name="description"
                                value={description || ''}
                                onChange={onChangeUpdatedPostForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Url"
                                name="url"
                                value={url || ''}
                                onChange={onChangeUpdatedPostForm} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' value={status || ''} name='status' onChange={onChangeUpdatedPostForm}>
                                <option value='TO LEARN'>To Learn</option>
                                <option value='LEARNING'>Learning</option>
                                <option value='LEARNED'>Learned</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                        <Button variant="primary" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default UpdatePostModal