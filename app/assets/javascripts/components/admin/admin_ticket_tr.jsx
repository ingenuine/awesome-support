class AdminTicketTr extends React.Component {

  render() {
    let participants = _.map(this.props.ticket.participants, function(participant) {
      return <Avatar key={participant} participant={participant} />
    })

    let filterKlass;
    if (this.props.isVisible.length) {
      filterKlass =
        (this.props.isVisible === this.props.ticket.status) ?
        ('visible-' + this.props.ticket.status) :
        ('hidden-' + this.props.ticket.status)
    }
    return (
      <tr className={filterKlass}>
        <td>
          <Link to={'/admin/ticket/edit/' + this.props.ticket.id}>
            {this.props.ticket.title}
          </Link>
        </td>
        <td>
          <small>{moment(this.props.ticket.created_at).fromNow()}</small>
        </td>
        <td className="hidden-xs">{participants}</td>
        <td>
          <span className={'label label-' + this.props.ticket.status}>
            {this.props.ticket.status}
          </span>
        </td>
      </tr>
    )
  }
}

AdminTicketTr.propTypes = {
  ticket: React.PropTypes.object.isRequired,
  isVisible: React.PropTypes.string
}
