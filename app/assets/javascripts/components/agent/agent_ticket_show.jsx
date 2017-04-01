class AgentTicketShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      linkable: false,
      ticket: ''
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    TicketStore.getResource(this.props.match.params.ticketId).then(data => {
      this.setState({
        loaded: true,
        linkable: false,
        ticket: data.ticket
      })
    })
  }

  handleSuccess() {
    this.componentDidMount()
  }

  render() {
    if (!this.state.loaded) { return <Spinner /> }

    let Resource = {
      comment:      {content: '', ticket_id: this.props.match.params.ticketId},
      content:      '',
      ticket_id:    this.props.match.params.ticketId
    }

    let Comments
    if (this.state.ticket.comments.length > 0) {
      Comments = _.map(this.state.ticket.comments, function(comment) {
        return <Comment key={comment.id} comment={comment} />
      })
    }
    let ShowForm
    if (this.state.ticket.status === 'active') {
      ShowForm = (
        <CommentForm
          resource={Resource}
          onSuccess={this.handleSuccess} />
      )
    }

    if (this.state.ticket.status === 'replied') {
      ShowForm = (
        <div className="alert alert-info">
          <div className="row">
            <div className="col-md-2 col-xs-2 text-center">
              <h1 className="glyphicon glyphicon-thumbs-up"></h1>
            </div>
            <div className="col-md-10 col-xs-10">
              <br></br>
              <p>Great Job. Now lets wait for customer to respond. Don't worry. You'll get notified when they do.</p>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.ticket.status === 'closed') {
      ShowForm = (
        <div className="alert alert-info">
          <div className="row">
            <div className="col-md-2 col-xs-2 text-center">
              <h1 className="glyphicon glyphicon-thumbs-up"></h1>
            </div>
            <div className="col-md-10 col-xs-10">
              <br></br>
              <p>Sweet. This ticket is done. Let's find another one.</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel">
            <div className="panel-heading">
              <h4>
                <Link to="/agent">
                  <i className="glyphicon glyphicon-tags"></i>
                  <span>All Tickets</span>
                </Link>
                <Link to="/agent" className="pull-right"><i className="glyphicon glyphicon-chevron-left"></i></Link>
              </h4>
            </div>
          </div>
          <AgentTicket
            key={this.state.ticket.id}
            ticket={this.state.ticket}
            linkable={this.state.linkable} />
          {Comments}
          {ShowForm}
        </div>
      </div>
    )
  }
}

AgentTicketShow.contextTypes = {
  router: React.PropTypes.object.isRequired
}
