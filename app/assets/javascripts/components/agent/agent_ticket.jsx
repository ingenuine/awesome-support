class AgentTicket extends React.Component {

  render() {
    let participants = _.map(this.props.ticket.participants, function(participant) {
      return <Avatar key={participant} participant={participant} />
    })

    let ticketTitle
    if (this.props.linkable) {
      ticketTitle = (
        <Link to={'/agent/ticket/' + this.props.ticket.id}>{this.props.ticket.title}</Link>
      )
    } else {
      ticketTitle = (
        this.props.ticket.title
      )
    }

    return (
      <div className="panel">
        <div className="panel-heading">
          <h4>
            <small title="{this.props.ticket.created_at}">
              <i className="glyphicon glyphicon-time"></i>
              {moment(this.props.ticket.created_at).fromNow()}
            </small>
          </h4>
        </div>
        <div className="panel-body">
          <h4>
            {ticketTitle}
          </h4>
          <p>{this.props.ticket.description}</p>
        </div>
        <div className="panel-footer text-muted clearfix">
          <small className={'label label-' + this.props.ticket.status}>{this.props.ticket.status}</small>
          <div className="pull-right">
            {participants}
          </div>
        </div>
      </div>
    )
  }
}

AgentTicket.propTypes = {
  ticket: React.PropTypes.object.isRequired
}
