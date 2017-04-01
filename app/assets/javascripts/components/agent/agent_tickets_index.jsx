class AgentTicketsIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, linkable: false, tickets: [] }
    this.handleSearch = this.handleSearch.bind(this)
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

  handleSearch(data) {
    this.setState({ tickets: data.tickets })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    const _that = this
    let tickets = _.map(this.state.tickets, function(ticket) {
      return <AgentTicket key={ticket.id} ticket={ticket} linkable={_that.state.linkable} />
    })

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col-md-10 col-xs-10">
                  <SearchForm handleSearch={this.handleSearch} resourceName='tickets' />
                </div>
                <div className="col-md-2 col-xs-2">
                  <Link to="/agent/tickets/report" className="btn btn-lg btn-primary"><i className="glyphicon glyphicon-signal"></i></Link>
                </div>
              </div>
            </div>
          </div>
          {tickets}
        </div>
      </div>
    )
  }
}
