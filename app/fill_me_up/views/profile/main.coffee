FillMeUp.Views.Profile.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  profileView = Ti.UI.createView
    id:               "profileView"
    backgroundColor:  "white"

  window.add profileView

  window
