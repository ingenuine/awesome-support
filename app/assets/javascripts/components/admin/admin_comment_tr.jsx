class AdminCommentTr extends React.Component {

  render() {
    return (
      <tr>
        <td>
          <Link to={'/admin/comment/edit/' + this.props.comment.id}>
            {this.props.comment.id}
          </Link>
        </td>
        <td>
          <p>
            <small>{this.props.comment.author}</small>
            <small className="pull-right">{this.props.comment.created_at} ago</small>
          </p>
          <p>{this.props.comment.content}</p>
        </td>
      </tr>
    )
  }
}

AdminCommentTr.propTypes = {
  comment: React.PropTypes.object.isRequired
}
