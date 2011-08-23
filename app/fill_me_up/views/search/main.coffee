FillMeUp.Views.Search.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  searchView = Ti.UI.createView
    id:               "searchView"
    backgroundColor:  "white"

  searchTextField = Ti.UI.createTextField
    id:               "searchTextField"

  window.add searchView
  window.add searchTextField
  
  window
