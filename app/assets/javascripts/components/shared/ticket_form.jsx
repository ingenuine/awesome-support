class TicketForm extends React.Component {

  constructor(props) {
    super(props)
    this.store = TicketStore
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
      resource['ticket'][name] = value
      resource[name] = value
      const errors = previousState.errors
      errors[name] = ''
      return { resource: resource, errors: errors }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (_.isEmpty(this.state.resource)) {
      this.state.resource = { ticket: { title: '', description: '' } }
    }

    let action = this.state.resource.id ? 'updateResource' : 'createResource'

    let deferred = this.store[action](this.state.resource)

    deferred
    .done(data => {
      this.props.onSuccess(data);
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
        <TextInput {...this.getInputProps('title')} label='Title' autoFocus={true} />
        <TextareaInput {...this.getInputProps('description')} label='Describe Issue' />
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          <i className="glyphicon glyphicon-ok"></i>
        </button>
      </form>
    )
  }
}

TicketForm.propTypes = {
  resource:  React.PropTypes.object.isRequired,
  onSuccess: React.PropTypes.func.isRequired
}
