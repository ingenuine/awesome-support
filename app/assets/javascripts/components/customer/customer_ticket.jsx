class CustomerTicket extends React.Component {

  render() {
    let participants = _.map(this.props.ticket.participants, function(participant) {
      return <Avatar key={participant} participant={participant} />
    })

    let ticketTitle
    if (this.props.linkable) {
      ticketTitle = (
        <Link to={'/customer/ticket/' + this.props.ticket.id}>
          {this.props.ticket.title}
        </Link>
      )
    } else {
      ticketTitle = this.props.ticket.title
    }

    let editButton
    if (this.props.ticket.status === 'active' && this.props.ticket.comments.length < 1) {
      editButton = (
        <Link
          to={'/customer/tickets/edit/' + this.props.ticket.id}
          className="pull-right"
        >
          <i className="glyphicon glyphicon-pencil"></i>
        </Link>
      )
    }

    return (
      <div className="panel">
        <div className="panel-heading">
          <h4>
            <small title={this.props.ticket.created_at}>
              <i className="glyphicon glyphicon-time"></i>
              {moment(this.props.ticket.created_at).fromNow()}
            </small>
            {editButton}
          </h4>
        </div>
        <div className="panel-body">
          <h4>
            {ticketTitle}
          </h4>
          <p>{this.props.ticket.description}</p>
        </div>
        <div className="panel-footer text-muted clearfix">
          <span className={'label label-' + this.props.ticket.status}>
            {this.props.ticket.status}
          </span>
          <div className="pull-right">
            {participants}
          </div>
        </div>
      </div>
    )
  }
}

CustomerTicket.propTypes = {
  ticket: React.PropTypes.object.isRequired,
  linkable: React.PropTypes.bool.isRequired
}
