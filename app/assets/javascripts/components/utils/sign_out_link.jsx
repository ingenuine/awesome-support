const SignOutLink = React.createClass({

  getMetaContent(name) {
    var metas = document.getElementsByTagName('meta')

    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') == name) {
        return metas[i].getAttribute('content')
      }
    }

    return ''
  },

  _signOut(e) {
    e.preventDefault()

    $.ajax({
      method: 'DELETE',
      url: '/auth/logout',
      data: {
        authenticity_token: this.getMetaContent('csrf-token')
      }
    }).done(function(){
      location.reload()
    })
  },

  render() {
    return (
      <a href="#" onClick={this._signOut}><i className="glyphicon glyphicon-log-out"></i></a>
    )
  }
})
