class AdminUsersIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, users: [] }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    UserStore.getResources().then(data => {
      this.setState({
        loaded: true,
        users:  data.users
      })
    })
  }

  handleSearch(data) {
    this.setState({ users: data.users })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    const _that = this
    let users = _.map(this.state.users, function(user) {
      return <AdminUserTr key={user.id} user={user} />
    })

    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel">
            <div className="panel-heading">
              <SearchForm handleSearch={this.handleSearch} resourceName='users' />
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
