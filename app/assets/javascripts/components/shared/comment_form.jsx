class CommentForm extends React.Component {

  constructor(props) {
    super(props)
    this.store = CommentStore
    this.state = {
      resource: props.resource,
      ticketId: props.ticketId,
      errors:   {}
    }

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
      resource['comment'][name] = value
      resource[name] = value
      const errors = previousState.errors
      errors[name] = ''
      return { resource: resource, errors: errors }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (_.isEmpty(this.state.resource)) {
      this.state.resource = { comment: { content: '', ticket_id: '' } }
    }
    let action = this.state.resource.id ? 'updateResource' : 'createResource'

    let deferred = this.store[action](this.state.resource)

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
      <div className="panel">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <HiddenInput {...this.getInputProps('ticket_id')} />
            <TextareaInput {...this.getInputProps('content')} label='Message' autoFocus={true} />
          <button type="submit" className="btn btn-lg btn-info btn-block">
              <i className="glyphicon glyphicon-send"></i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  resource:  React.PropTypes.object.isRequired,
  onSuccess: React.PropTypes.func.isRequired
}
