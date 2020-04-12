import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/actions';

export default function PostList() {
    const dispatch = useDispatch();
    const selectedSubbredit = useSelector(state => state.selectedSubreddit)
    const { isLoading, items } = useSelector(state => state.posts);


    useEffect(() => {
        dispatch(fetchPosts(selectedSubbredit))
    }, [selectedSubbredit]);


    return (
        <div>
            {isLoading && <h3>Loading...</h3>}
            <ul>
                {items.map(post => <li>{post.title}</li>)}
            </ul>
        </div>
    )
}
