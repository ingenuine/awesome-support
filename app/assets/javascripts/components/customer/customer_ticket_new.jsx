class CustomerTicketNew extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    this.setState({ loaded: true })
  }

  handleSuccess() {
    this.context.router.history.push('/customer')
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    let Resource = {
      ticket:       {title: '', description: ''},
      id:           '',
      title:        '',
      description:  ''
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading text-muted">
              <h4>
                <i className="glyphicon glyphicon-tag"></i>
                <span>Create New Ticket</span>
                <Link to="/customer" className="pull-right">
                  <i className="glyphicon glyphicon-remove"></i>
                </Link>
              </h4>
            </div>
            <div className="panel-body">
              <TicketForm
                resource={Resource}
                onSuccess={this.handleSuccess} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CustomerTicketNew.contextTypes = {
  router: React.PropTypes.object.isRequired
}
