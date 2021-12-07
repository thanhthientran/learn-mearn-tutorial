import { useContext, useEffect } from "react";
// import { Navigate } from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

import { AuthContext } from './../contexts/AuthContext'
import NavbarMenu from './../components/Layout/navbarMenu'
import AddPostModal from './../components/posts/AddPost'
import UpdatePostModal from './../components/posts/UpdatePost'
import { PostContext } from "../contexts/PostContext";
import SinglePost from "../components/posts/SinglePost";
import addIcon from "../assets/plus-circle-fill.svg"

const Dashboard = () => {
    const { postState: { postById,posts, postLoading }, getPosts, setShowAddPostModal } = useContext(PostContext)
    const { authState: { user: { username } } } = useContext(AuthContext)

    // Start: Get all posts
	useEffect(() => {
        getPosts()
    }, [postById])

    let body = null
    if (postLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (posts && posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1' >Hi {username} </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to my Web</Card.Title>
                        <Card.Text>
                            Click the button bellow to track your first post
                        </Card.Text>
                        <Button variant='primary' data-bs-toggle="modal" data-bs-target="#edit-post-modal" onClick={setShowAddPostModal.bind(this, true)}>Create!</Button>
                    </Card.Body>
                </Card>
                {/* Open ADD form */}
                <OverlayTrigger placement="left" overlay={<Tooltip>Add new post</Tooltip>}>
                    <Button
                        className="btn-floating"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-post-modal "
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img src={addIcon} alt='add-post' width='60' height='60' />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }
    else if (posts) {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-4 g-4 mx-auto mt-4">
                    {posts.map(post => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post}></SinglePost>
                        </Col>
                    ))}
                </Row>

                {/* Open ADD form */}
                <OverlayTrigger placement="left" overlay={<Tooltip>Add new post</Tooltip>}>
                    <Button
                        className="btn-floating"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-post-modal "
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img src={addIcon} alt='add-post' width='60' height='60' />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            <div>
                <NavbarMenu />
                {body}
                <AddPostModal />
                {posts!==null && <UpdatePostModal /> }
            </div>
        </>
    )

}

export default Dashboard