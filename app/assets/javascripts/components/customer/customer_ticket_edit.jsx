class CustomerTicketEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    TicketStore.getResource(this.props.match.params.ticketId).then(data => {
      this.setState({
        loaded: true,
        ticket: data.ticket
      })
    })
  }

  handleSuccess() {
    this.context.router.history.push('/customer')
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    let Resource = {
      ticket:       this.state.ticket,
      id:           this.state.ticket.id,
      title:        this.state.ticket.title,
      description:  this.state.ticket.description
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading text-muted">
              <h4>
                <i className="glyphicon glyphicon-tag"></i>
                <span>Edit Ticket</span>
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

CustomerTicketEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
}
