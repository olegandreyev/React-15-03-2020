import React from 'react'
import {  Container, Item, Loader, Dimmer} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import useData from '../hooks/useData'

export default function AlbumsPage() {
    const [albums, isFetching] = useData('/albums', []);
    return (
        <Container className='page'>
            <Dimmer active={isFetching} inverted>
                <Loader></Loader>
            </Dimmer>
            <Item.Group className='posts'>
                {albums.map(album =>(
                    <Item>
                    <Item.Content>
                        <Item.Header>{album.title}</Item.Header>
                        <Item.Extra>
                            <Link to={`/users/${album.userId}/albums/${album.id}`}>See photos</Link>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Container>
    )
}
