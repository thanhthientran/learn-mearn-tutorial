import { createContext, useReducer, useState } from "react";
import { postReducer } from '../reducers/postReducer';
import { apiUrl } from "./constants";
import axios from "axios"

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    //state
    const [postState, dispatch] = useReducer(postReducer, {
        postById: null,
        post: [],
        postsLoading: true,
    })

    //set show form Add post
    const [showAddPostModal, setShowAddPostModal] = useState(false)

    //set show form update post
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    //Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`)
            if (response.data.success) {
                dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts })
                // console.log(response.data)
            }
        } catch (error) {
            dispatch({ type: 'POSTS_LOADED_FAIL' })
        }
    }

    //Add new post
    const addNewPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post/create`, newPost)
            if (response.data.success) {
                dispatch({ type: 'ADD_POST', payload: response.data.post })
                return response.data
            }
            else return {success: false, message:response.data.message}
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'something is wrong' }
        }
    }

    // Find post
    const findPost = async (postId) => {
        const post = postState.posts.find(post => post._id=== postId)
        // console.log(post)
        dispatch({ type: 'FIND_POST',payload: post})
        postState.postById = post
        // console.log(postState.postById)
        return post
    }

    // Update post
    const updatePost = async (updatedPost) =>{
        try {
            const response = await axios.put(`${apiUrl}/post/${updatedPost._id}/edit`, updatedPost)
            if (response.data.success) {
                // console.log(response.data)
                dispatch({ type: 'UPDATE_POST', payload: response.data.postUpdate })
                return response.data
            }
            else return {success: false, message:response.data.message}
        }
        catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'something is wrong' }
        }
    }

    //delete post
    const deletePost = async (postId) => {
        try{
            const response = await axios.delete(`${apiUrl}/post/${postId}/delete`)
            if (response.data.success) {
                dispatch({ type: 'DELETE_POST', payload: postId })
                return response.data
            }
            else return {success: false, message:response.data.message}
        }
        catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'something is wrong' }
        }
    }

    //post context data
    const postContextData = { 
        postState, 
        getPosts,
        findPost, 
        addNewPost ,
        showAddPostModal,
        setShowAddPostModal,
        deletePost, 
        updatePost,
        setShowUpdatePostModal,
        showUpdatePostModal
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )


}

export default PostContextProvider