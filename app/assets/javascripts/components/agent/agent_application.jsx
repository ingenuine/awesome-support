class AgentApplication extends React.Component {

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
                <div className="navbar-brand">
                  <Link to="/agent">
                    <IconLogo />
                    {/* <h4>AWESOME<span className="text-primary">.</span>SUPPORT</h4> */}
                  </Link>
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
            <Route exact path="/agent" component={AgentTicketsIndex}/>
            <Route path="/agent/ticket/:ticketId" component={AgentTicketShow}/>
            <Route path="/agent/tickets/report" component={Report}/>
          </div>
        </div>
      </Router>
    )
  }
}
