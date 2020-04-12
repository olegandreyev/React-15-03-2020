import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSubredit } from '../redux/actions';

export default function Picker() {
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(state => state.selectedSubreddit)
    return (
        <div>
            <h2>ReactJS</h2>
            <select onChange={e => dispatch(selectSubredit(e.target.value))} value={selectedSubreddit}>
                <option value="reactjs">ReactJS</option>
                <option value="frontend">FrontEnd</option>
            </select>
        </div>
    )
}
