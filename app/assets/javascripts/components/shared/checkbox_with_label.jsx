const CheckboxWithLabel = React.createClass({

  getInitialState: function () {
    return { isChecked: false }
  },

  onChange: function () {
    this.setState({isChecked: !this.state.isChecked});
  },

  render: function () {
    const label = this.state.isChecked ? this.props.labelOn : this.props.labelOff

    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {label}
      </label>
    )
  }
})
