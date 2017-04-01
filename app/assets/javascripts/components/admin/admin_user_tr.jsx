class AdminUserTr extends React.Component {

  render() {
    return (
      <tr>
        <td>
          <Link to={'/admin/user/edit/' + this.props.user.id}>
            {this.props.user.name}
          </Link>
        </td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
      </tr>
    )
  }
}

AdminUserTr.propTypes = {
  user: React.PropTypes.object.isRequired
}
