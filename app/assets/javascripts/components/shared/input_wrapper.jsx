class InputWrapper extends React.Component {

  render() {
    let className = classNames('form-group', {
      'has-error': this.props.errors.length !== 0
    })

    return (
      <div className={className}>
        {this.props.children}
        {this.props.errors}
      </div>
    )
  }
}

InputWrapper.propTypes = {
  errors: React.PropTypes.array
}
