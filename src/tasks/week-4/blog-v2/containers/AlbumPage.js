import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import Glide from '../../../week-3/glide/Glide'
import { Dimmer, Loader, Container, Image, Header } from 'semantic-ui-react'
import useData from '../hooks/useData';

export default function AlbumPage() {
    const { userId, albumId } = useParams();
    const [album, , err] = useData(`/albums/${albumId}`, {});
    const [photos, isFetching ] = useData(`/albums/${albumId}/photos`, []);
    console.log(err)
    if (err && err.status === 404) {
        console.log(err);
        return <Redirect to={`/users/${userId}`} />
    }
    return (
        <Container className='page'>
            <Dimmer inverted active={isFetching}><Loader active></Loader></Dimmer>
            <Header>{album.title}</Header>
            {photos.length > 0 &&
            <Glide options={{ perView: 3 }} bullets={false}>
                {photos.map(photo => <Image src={photo.url} rounded></Image>)}
            </Glide>
            }
        </Container>
    )
}
