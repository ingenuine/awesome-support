class AdminCommentsIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, comments: [] }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    CommentStore.getResources().then(data => {
      this.setState({
        loaded: true,
        comments:  data.comments
      })
    })
  }

  handleSearch(data) {
    this.setState({ comments: data.comments })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    const _that = this
    let comments = _.map(this.state.comments, function(comment) {
      return <AdminCommentTr key={comment.id} comment={comment} />
    })

    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel">
            <div className="panel-heading">
              <SearchForm handleSearch={this.handleSearch} resourceName='comments' />
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Content</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {comments}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
