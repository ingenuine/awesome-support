class TextInput extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onInputChange(this.props.name, e.target.value)
  }

  render() {
    return (
      <InputWrapper errors={this.props.errors}>
        <label>{this.props.label}</label>
        <input type="text"
          autoFocus={this.props.autoFocus}
          className={this.props.className}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange} />
      </InputWrapper>
    )
  }
}

TextInput.propTypes = {
  autoFocus:     React.PropTypes.bool,
  label:         React.PropTypes.string,
  className:     React.PropTypes.string,
  errors:        React.PropTypes.array,
  name:          React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  value:         React.PropTypes.any
}

TextInput.defaultProps = {
  autoFocus: false,
  className: 'form-control'
}
