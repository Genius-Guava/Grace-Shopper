import React from 'react'
import {Button, Spinner, Card, Container} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class EditUser extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/users')
    this.setState({users: data})
  }

  render() {
    if (!this.state.users.length) return <Spinner animation="border" />
    const group = this.state.users

    return (
      <Container className="ml-5">
        {group.map(currentUser => (
          <Card key={currentUser.id} className="m-2">
            <Card.Body>
              <Card.Text>{currentUser.id}</Card.Text>
              <Card.Text>
                {currentUser.firstName} {currentUser.lastName}
              </Card.Text>
              <Card.Text>{currentUser.email}</Card.Text>
              <Button variant="success">Edit</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    )
  }
}
