class AdminTicketsIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, tickets: [], statusFilter: '' }
    this.handleSearch = this.handleSearch.bind(this)
    this.filterStatus = this.filterStatus.bind(this)
  }

  componentDidMount() {
    TicketStore.getResources().then(data => {
      this.setState({
        loaded: true,
        tickets:  data.tickets,
        statusFilter: ''
      })
    })
  }

  handleSearch(data) {
    this.setState({ tickets: data.tickets })
  }

  filterStatus(e) {
    e.preventDefault()
    const clicked_btn = e.target
    const active_btn = clicked_btn.parentElement.parentElement.querySelector('.active')
    active_btn.classList.remove('active')
    clicked_btn.className += ' active'
    this.setState({ statusFilter: e.target.dataset.status })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    const _that = this
    let tickets = _.map(this.state.tickets, function(ticket) {
      return (
        <AdminTicketTr
          key={ticket.id}
          ticket={ticket}
          isVisible={_that.state.statusFilter}
        />
      )
    })

    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel">
            <div className="panel-heading">
              <div className="btn-group btn-group-justified"
                role="group" aria-label="...">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-lg btn-default active"
                    data-status=""
                    onClick={this.filterStatus}>All</button>
                </div>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-lg btn-default"
                    data-status="active"
                    onClick={this.filterStatus}>Active</button>
                </div>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-lg btn-default"
                    data-status="replied"
                    onClick={this.filterStatus}>Replied</button>
                </div>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-lg btn-default"
                    data-status="closed"
                    onClick={this.filterStatus}>Closed</button>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <SearchForm
                handleSearch={this.handleSearch} resourceName='tickets' />
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Created</th>
                    <th className="hidden-xs">Participants</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
