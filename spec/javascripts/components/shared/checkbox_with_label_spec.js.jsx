var TestUtils = React.addons.TestUtils

describe('CheckboxWithLabel', function () {

  it('changes the text after click', function () {
    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );

    var checkboxNode = ReactDOM.findDOMNode(checkbox);

    // Verify that it's Off by default
    expect(checkboxNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(
        checkbox,
        'input'
      )
    );
    expect(checkboxNode.textContent).toEqual('On');
  });

});
