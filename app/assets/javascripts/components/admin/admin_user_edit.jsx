class AdminUserEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    UserStore.getResource(this.props.match.params.userId).then(data => {
      this.setState({
        loaded: true,
        user: data.user
      })
    })
  }

  handleSuccess() {
    this.context.router.history.push('/admin/users')
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    let Resource = {
      user:         this.state.user,
      id:           this.state.user.id,
      name:         this.state.user.name,
      email:        this.state.user.email
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading">
              <h4>
                <i className="glyphicon glyphicon-tag"></i>
                <span>Edit User</span>
                <Link to="/admin/users" className="pull-right">
                  <i className="glyphicon glyphicon-remove"></i>
                </Link>
              </h4>
            </div>
            <div className="panel-body">
              <UserForm
                resource={Resource}
                onSuccess={this.handleSuccess} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminUserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
}
