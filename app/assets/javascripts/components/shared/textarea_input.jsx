const DEFAULT_HEIGHT = 100
class TextareaInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { height: DEFAULT_HEIGHT }

    this.handleChange = this.handleChange.bind(this)
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.setFilledTextareaHeight()
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost
      this.setState({
        height: element.clientHeight + 60
      })
    }
  }

  getGhostField() {
    return (
      <div
        className="textarea textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {this.props.value}
      </div>
    )
  }

  handleChange(e) {
    this.props.onInputChange(this.props.name, e.target.value)
  }

  render() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT
    const { height } = this.state
    return (
      <InputWrapper errors={this.props.errors}>
        <label>{this.props.label}</label>
        <textarea
          rows='4'
          className={this.props.className}
          name={this.props.name}
          value={this.props.value}
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          onChange={this.handleChange}
          onKeyUp={this.setFilledTextareaHeight} />
        {this.getGhostField()}
      </InputWrapper>
    )
  }
}

TextareaInput.propTypes = {
  className:     React.PropTypes.string,
  errors:        React.PropTypes.array,
  name:          React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  value:         React.PropTypes.any
}

TextareaInput.defaultProps = {
  className: 'form-control'
}
