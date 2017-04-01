class UserForm extends React.Component {

  constructor(props) {
    super(props)
    this.store = UserStore
    this.state = { resource: props.resource, errors: {} }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit      = this.handleSubmit.bind(this)
  }

  getInputProps(attr) {
    return {
      name:          attr,
      value:         this.state.resource[attr] || '',
      errors:        this.state.errors[attr] || [],
      onInputChange: this.handleInputChange
    }
  }

  handleInputChange(name, value) {
    this.setState(function(previousState) {
      const resource = previousState.resource
      const errors = previousState.errors

      resource['user'][name] = value
      resource[name] = value
      errors[name] = ''
      return { resource: resource, errors: errors }
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (_.isEmpty(this.state.resource)) {
      this.state.resource = {user: {name: '', email: ''}}
    }

    let deferred = this.store['updateResource'](this.state.resource)

    deferred
    .done(data => {
      this.props.onSuccess(data)
    })
    .fail(xhr => {
      this.setState({
        errors: JSON.parse(xhr.responseText).errors
      })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput {...this.getInputProps('name')} autoFocus={true} />
        <TextInput {...this.getInputProps('email')} />
        <button type="submit" className="btn btn-lg btn-primary btn-block">Save</button>
      </form>
    )
  }
}

UserForm.propTypes = {
  resource:  React.PropTypes.object.isRequired,
  onSuccess: React.PropTypes.func.isRequired
}
