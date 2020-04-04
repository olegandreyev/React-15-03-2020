import React from 'react'
import useData from '../hooks/useData'
import { Dimmer, Loader, Grid, Card, Image, Container } from 'semantic-ui-react';
import { Link,  } from 'react-router-dom'

export default function UsersPage() {
    const [users, isFetching] = useData('/users', []);

    return (
        <Container className='page'>
         <Dimmer active={isFetching} inverted><Loader /></Dimmer>
        <Grid className='users' columns={4}>
        {users.map(user => (
            <Grid.Column>
                <Card style={{ width: '100%' }}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>
                        <Link to={`/users/${user.id}`} className='email'>{user.name}</Link>
                    </Card.Header>
                    <Card.Meta>
                        <Link to={`/users/${user.id}`} className='email'>{user.email}</Link>
                    </Card.Meta>
                    <Card.Description>
                    {user.address.street} {user.address.suite}, {user.address.city}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content>
                </Card.Content>
                </Card>
            </Grid.Column>
        ))}
      </Grid>
      </Container>

    )
}
