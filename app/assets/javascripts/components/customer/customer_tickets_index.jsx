class CustomerTicketsIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, linkable: false }
  }

  componentDidMount() {
    TicketStore.getResources().then(data => {
      this.setState({
        loaded: true,
        linkable: true,
        tickets:  data.tickets
      })
    })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    var _that = this
    let tickets = _.map(this.state.tickets, function(ticket) {
      return <CustomerTicket key={ticket.id} ticket={ticket} linkable={_that.state.linkable} />
    })

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading text-muted">
              <h4>
                <i className="glyphicon glyphicon-tags"></i>
                <span>My Tickets</span>
                <Link to="/customer/tickets/new" className="pull-right">
                  <i className="glyphicon glyphicon-plus"></i>
                </Link>
              </h4>
            </div>
          </div>
          {tickets}
        </div>
      </div>
    )
  }
}
