FillMeUp.Views.Updates.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  updatesList = ['UPDATE 1', 'UPDATE 2', 'UPDATE 3']

  for item in updatesList
    updatesRow = Ti.UI.createTableViewRow
      id:                 "updatesRow"
      title:              item

    updatesList.push updatesRow

  updatesView = Ti.UI.createView
    id:                   "updatesView"

  updatesTable = Ti.UI.createTableView
    id:                   "updatesTable"
    headerTitle:          "Latest Updates"
    data:                 updatesList

  window.add updatesView
  window.add updatesTable

  window
