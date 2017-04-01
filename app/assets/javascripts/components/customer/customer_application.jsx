class CustomerApplication extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button className="navbar-toggle collapsed" aria-expanded="false" data-target="#top-nav" data-toggle="collapse" type="button">
                  <span className="sr-only">Toggle navigation</span>
                  <i className="glyphicon.glyphicon-option-vertical"></i>
                </button>
                <div className="navbar-brand navbar-brand-center">
                  <Link to="/customer"><IconLogo /></Link>
                </div>
              </div>
              <div id="top-nav" className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><SignOutLink /></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/customer" component={CustomerTicketsIndex}/>
            <Route path="/customer/tickets/new" component={CustomerTicketNew}/>
            <Route path="/customer/ticket/:ticketId" component={CustomerTicketShow}/>
            <Route path="/customer/tickets/edit/:ticketId" component={CustomerTicketEdit}/>
          </div>
        </div>
      </Router>
    )
  }
}
