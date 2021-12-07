import { useContext } from 'react'
import Button from 'react-bootstrap/Button'

import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'

const ActionButton = ({ url, _id }) => {


    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const choosePost = postId => {
        //take post by Id
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button className="mx-3 post-button" href={url} target='_blank'>
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className="mx-3 post-button" onClick={choosePost.bind(this,_id)}>
                <img src={editIcon} alt='edit' width='24' height='24' />
            </Button>
            <Button className="mx-3 post-button" onClick={deletePost.bind(this, _id)}>
                <img src={deleteIcon} alt='edit' width='24' height='24' />
            </Button>
        </>
    )
}

export default ActionButton