class AdminDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loaded: false, data: [] }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const _that = this

    $.ajax({
      url: '/api/v1/dashboards/data',
      contentType:  'application/json',
      dataType:     'json',
      success(data) {
        _that.setState({
          loaded: true,
          data:   data
        })
      },
      error(xhr, status, error) {
        alert('Data error: ', error)
      }
    })
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    return (
      <div>
        <div className="row text-center text-primary">
          <div className="col-md-2"></div>
          <div className="col-md-2">
            <div className="panel">
              <div className="panel-body">
                <h1>{this.state.data.agents_count}</h1>
                <p>AGENTS</p>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="panel">
              <div className="panel-body">
                <h1>{this.state.data.customers_count}</h1>
                <p>CUSTOMERS</p>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="panel">
              <div className="panel-body">
                <h1>{this.state.data.tickets_count}</h1>
                <p>ALL TICKETS</p>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="panel">
              <div className="panel-body">
                <h1>{this.state.data.closed_tickets_count}</h1>
                <p>CLOSED TICKETS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="panel">
              <div className="panel-heading">
                <h4>Closed tickets last month</h4>
              </div>
              <div className="panel-body">
                <LineChart data='/api/v1/charts/last_month_closed_tickets' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
