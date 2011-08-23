FillMeUp.Views.Facebook.createMainWindow = (options) ->
  window = Ti.UI.createWindow(options)

  Titanium.Facebook.appid = "107384569364316"

  Titanium.Facebook.permissions = ['publish_stream', 'read_stream']
  
  facebookView = Ti.UI.createView
    id:               'facebookView'
    backgroundColor:  'white'

  # Facebook Login Status
  facebookLabel = Ti.UI.createLabel
    id:               'facebookLabel'
    text:             'Logged in = ' + Titanium.Facebook.loggedIn
    font:
      size:           14
    height:           'auto'
    top:              10
    textAlign:        'center'

  facebookButton = Ti.UI.createButton
    id:               'facebookButton'
    title:            'Force dialog: ' + Titanium.Facebook.forceDialogAuth
    top:              50
    width:            160
    height:           40

  facebookButton.addEventListener 'click', (e) ->
    Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth
    facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth
    facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn

  # capture Login Status
  Titanium.Facebook.addEventListener 'login', (e) ->
    facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn
  Titanium.Facebook.addEventListener 'logout', (e) ->
    facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn

  # Facebook Button
  loginButton = Titanium.Facebook.createLoginButton
    style:            'wide'
    bottom:           30

  window.add facebookView
  window.add facebookLabel
  window.add facebookButton
  window.add loginButton
  window
