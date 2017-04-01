class AdminApplication extends React.Component {

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
                  <Link to="/admin"><IconLogo /></Link>
                </div>
              </div>
              <div id="top-nav" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/admin"><i className="glyphicon glyphicon-blackboard"></i></Link></li>
                  <li><Link to="/admin/tickets"><i className="glyphicon glyphicon-tags"></i></Link></li>
                  <li><Link to="/admin/users"><i className="glyphicon glyphicon-user"></i></Link></li>
                  <li><Link to="/admin/comments"><i className="glyphicon glyphicon-comment"></i></Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><SignOutLink /></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/admin" component={AdminDashboard}/>
            <Route path="/admin/ticket/edit/:ticketId" component={AdminTicketEdit}/>
            <Route path="/admin/tickets" component={AdminTicketsIndex}/>
            <Route path="/admin/user/edit/:userId" component={AdminUserEdit}/>
            <Route path="/admin/users" component={AdminUsersIndex}/>
            <Route path="/admin/comment/edit/:commentId" component={AdminCommentEdit}/>
            <Route path="/admin/comments" component={AdminCommentsIndex}/>
          </div>
        </div>
      </Router>
    )
  }
}
