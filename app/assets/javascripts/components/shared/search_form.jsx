class SearchForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch() {
    const query = ReactDOM.findDOMNode(this.refs.query).value
    const _that = this

    $.ajax({
      url: '/api/v1/' + this.props.resourceName,
      contentType:  'application/json',
      dataType:     'json',
      processData:  true,
      data: { query: query },
      success(data) {
        _that.props.handleSearch(data);
      },
      error(xhr, status, error) {
        alert('Search error: ', error);
      }
    })
  }

  render() {
    return(
      <input onChange={this.handleSearch}
        type="text"
        className="form-control"
        placeholder="Type a search phrase..."
        ref="query" />
    )
  }
}
