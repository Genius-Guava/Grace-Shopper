import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'
import {Box, List, Heading, Section} from 'react-bulma-components'

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    const {users, user} = this.props
    return (
      <div>
        <Section>
          {user.isAdmin ? (
            <div>
              <Heading align="center">Users:</Heading>
              <Box>
                {users.map(mappedUser => {
                  return (
                    <div key={mappedUser.id}>
                      <List className="user-list">
                        <List.Item>UserID: {mappedUser.id}</List.Item>
                        <List.Item>Email: {mappedUser.email}</List.Item>
                        <List.Item>
                          Admin Status:{' '}
                          {mappedUser.isAdmin ? 'Admin' : 'Customer'}
                        </List.Item>
                      </List>
                    </div>
                  )
                })}
              </Box>
            </div>
          ) : (
            <Heading align="center">Admins only!</Heading>
          )}
        </Section>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(Users)
