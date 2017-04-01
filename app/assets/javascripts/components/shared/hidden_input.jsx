class HiddenInput extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input type="hidden"
        name={this.props.name}
        value={this.props.value} />
    )
  }
}

HiddenInput.propTypes = {
  name:          React.PropTypes.string.isRequired,
  value:         React.PropTypes.any
}
