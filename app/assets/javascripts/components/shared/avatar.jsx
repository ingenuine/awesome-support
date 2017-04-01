class Avatar extends React.Component {

  render() {
    return (
      <div className="avatar-circle-sm" title={this.props.participant}>
        <span className="initials">{this.props.participant.charAt(0)}</span>
      </div>
    )
  }
}

Avatar.propTypes = {
  participant: React.PropTypes.string.isRequired
}
