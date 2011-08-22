FillMeUp.Views.Login.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  loginView = Ti.UI.createView
    # add properties
    id:                 'baseView'
    width:              window.width
    height:             window.height

  nameTextField = Ti.UI.createTextField
    id:                 'loginTextField'
    top:                48
    left:               10
    borderStyle:        Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    hintText:           'Username'
    clearOnEdit:        'true'

  passwordTextField = Ti.UI.createTextField
    id:                 'loginTextField'
    top:                90
    left:               10
    hintText:           'Password'
    clearOnEdit:        'true'
    passwordMask:       'true'
    borderStyle:        Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

  loginButton = Ti.UI.createButton
    id:                 'loginButton'
    backgroundImage:    'images/button_login.png'
    height:             88
    width:              85
    top:                132
    left:               window.width-98
    borderStyle:        Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

  loginButtonLabel = Ti.UI.createLabel
    id:                 'loginButtonLabel'
    top:                132
    left:               window.width/2-10
    text:              'Wire In'

  loginButtonLabel.addEventListener 'click', (e) ->
    if nameTextField.value == 'admin' and passwordTextField.value == 'admin'
      window.close(loginView)
      FillMeUp.App.initTabGroup()
    else
      alert('Login is incorrect')

  window.add(loginView)
  window.add(nameTextField)
  window.add(passwordTextField)
  window.add(loginButton)
  window.add(loginButtonLabel)

  window
