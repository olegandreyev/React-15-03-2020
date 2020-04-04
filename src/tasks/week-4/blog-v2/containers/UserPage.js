import React from 'react'
import { useParams, Switch, Route , useRouteMatch, Link} from 'react-router-dom'
import { Card, Image, Icon, Container, Dimmer, Loader, Header, List, Grid } from 'semantic-ui-react'
import useData from '../hooks/useData';
import AlbumPage from './AlbumPage';
import NotFoundPage from './404';

export default function UserPage() {
    const { userId } = useParams();
    let { path, url } = useRouteMatch();

    const [user, isFetching] = useData(`/users/${userId}`, null)
    const [ albums ] = useData(`/users/${userId}/albums`, []);

    return (
        <Container className='page'>
            <Dimmer active={isFetching || !user} inverted><Loader /></Dimmer>
            {user &&
            <Grid>
                <Grid.Column width={6}>
                    <Card fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>
                            <span className='email'>{user.email}</span>
                        </Card.Meta>
                        <Card.Description>
                        {user.address.street} {user.address.suite}, {user.address.city}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {albums.length} Albums
                        </a>
                        </Card.Content>
                        <Card.Content>
                        <List>
                        {albums.map(album => (
                            <List.Item key={album.id}>
                                <Link to={`${url}/albums/${album.id}`}>{album.title}</Link>
                            </List.Item>
                        ))}
                        </List>
                    </Card.Content>
                </Card>
                </Grid.Column>
                <Grid.Column  width={10}>
                    <Switch>
                        <Route exact path={path}>
                            <Header as='h3'>Select a album.</Header>
                        </Route>
                        <Route path={`${path}/albums/:albumId`} exact>
                            <AlbumPage />
                        </Route>
                        <Route path='*'>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </Grid.Column>
            </Grid>
            }
        </Container>
    )
}
