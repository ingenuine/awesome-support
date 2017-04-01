class Report extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, linkable: false, tickets: [] }
  }

  componentDidMount() {
    this.getReport()
  }

  getReport() {
    const _that = this;
    $.ajax({
      url: '/api/v1/tickets/report',
      contentType:  'application/json',
      dataType:     'json',
      success(data) {
        _that.setState({
          loaded:   true,
          linkable: true,
          tickets:  data
        })
      },
      error(xhr, status, error) {
        alert('Report error: ', error)
      }
    })
  }

  downloadPdf(e) {
    e.preventDefault()
    window.location = '/api/v1/tickets/download_pdf'
  }

  render() {
    if (!this.state.loaded) { return <Spinner />; }
    const _that = this

    let Chart
    if (this.state.tickets.length > 0) {
      Chart = (
        <div className="panel">
          <div className="panel-heading text-muted">
            <h4>Solved tickets last month</h4>
          </div>
          <div className="panel-body">
            <LineChart data='/api/v1/charts/last_month_closed_tickets' />
          </div>
        </div>
      )
    }

    let Tickets
    if (this.state.tickets.length > 0) {
      Tickets = _.map(this.state.tickets, function(ticket) {
        return <AgentTicket key={ticket.id} ticket={ticket} linkable={_that.state.linkable} />
      })
    } else {
      Tickets = (
        <div className="panel panel-empty">
          <div className="panel-body text-center">
            <h1 className="glyphicon glyphicon-exclamation-sign text-primary"></h1>
            <h4>There are no closed tickets last month.</h4>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading text-muted">
              <h4>
                <i className="glyphicon glyphicon-signal"></i>
                <span>Report</span>
                <a href="#" onClick={this.downloadPdf}><i className="glyphicon glyphicon-print"></i></a>
                <Link to="/agent" className="pull-right"><i className="glyphicon glyphicon-chevron-left"></i></Link>
              </h4>
            </div>
          </div>
          {Chart}
          {Tickets}
        </div>
      </div>
    )
  }
}
