class AdminCommentEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    CommentStore.getResource(this.props.match.params.commentId).then(data => {
      this.setState({
        loaded: true,
        comment: data.comment
      })
    })
  }

  handleSuccess() {
    this.context.router.history.push('/admin/comments')
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    let Resource = {
      comment:      this.state.comment,
      id:           this.state.comment.id,
      content:      this.state.comment.content,
      ticket_id:    this.state.comment.ticket_id
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading">
              <h4>
                <i className="glyphicon glyphicon-tag"></i>
                <span>Edit Comment</span>
                <Link to="/admin/comments" className="pull-right">
                  <i className="glyphicon glyphicon-remove"></i>
                </Link>
              </h4>
            </div>
            <div className="panel-body">
              <CommentForm
                resource={Resource}
                onSuccess={this.handleSuccess} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminCommentEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
}
