class CustomerTicketShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      linkable: false,
      ticket: ''
    }
    this.handleSuccess = this.handleSuccess.bind(this)
    this.markAsDone = this.markAsDone.bind(this)
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

  markAsDone() {
    const _that = this;
    $.ajax({
      url: '/api/v1/tickets/' + _that.state.ticket.id + '/close',
      contentType:  'application/json',
      dataType:     'json',
      success() {
        _that.componentDidMount()
      },
      error(xhr, status, error) {
        alert('Closing error: ', error)
      }
    })
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
    let statusBasedContent
    if (this.state.ticket.status === 'active') {
      statusBasedContent = (
        <div className="alert alert-info">
          <div className="row">
            <div className="col-md-2 col-xs-2 text-center">
              <h1 className="glyphicon glyphicon-thumbs-up"></h1>
            </div>
            <div className="col-md-10 col-xs-10">
              <br></br>
            <p>Looks good. Grab a coffee and before you are back an answer should be waiting for you.</p>
            </div>
          </div>
        </div>
      )
    } else if (this.state.ticket.status === 'replied') {
      statusBasedContent = (
        <div>
          <CommentForm
            resource={Resource}
            onSuccess={this.handleSuccess} />
          <h3 className="text-center">or</h3>
          <div className="panel">
            <div className="panel-body">
              <button
                onClick={this.markAsDone}
                type="button"
                className="btn btn-lg btn-success btn-block">
                <span>Mark as done</span>
              </button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.ticket.status === 'closed') {
      statusBasedContent = (
        <div className="alert alert-success">
          <div className="row">
            <div className="col-md-2 col-xs-2 text-center">
              <h1 className="glyphicon glyphicon-thumbs-up"></h1>
            </div>
            <div className="col-md-10 col-xs-10">
              <br/>
              <h4>Hell yeah! We cracked this nutt.</h4>
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
                <Link to="/customer">
                  <i className="glyphicon glyphicon-tags"></i>
                  <span>My Tickets</span>
                </Link>
                <Link to="/customer/tickets/new" className="pull-right">
                  <i className="glyphicon glyphicon-plus"></i>
                </Link>
              </h4>
            </div>
          </div>
          <CustomerTicket
            key={this.state.ticket.id}
            ticket={this.state.ticket}
            linkable={this.state.linkable} />
          {Comments}
          {statusBasedContent}
        </div>
      </div>
    )
  }
}
