class Comment extends React.Component {

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <Avatar participant={this.props.comment.author} />
          <small className="text-muted pull-right" title={this.props.comment.created_at}>
            <br/>
            {moment(this.props.comment.created_at).fromNow()}
          </small>
        </div>
        <div className="panel-body">
          <p>{this.props.comment.content}</p>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired
}
