FillMeUp.Views.Toplocations.createMainWindow = (options) ->
  window = Ti.UI.createWindow(options)

  toplocationsList = ['ITEM 1', 'ITEM 2', 'ITEM 3']

  # This will be handling the data from api request
  for item in toplocationsList
    Ti.API.debug item
    toplocationsRow = Ti.UI.createTableViewRow
      id:                 'toplocationsRow'
      title:              item

    toplocationsList.push toplocationsRow

  toplocationsView = Ti.UI.createView
    id:                 'toplocationsView'

  locationsTable = Ti.UI.createTableView
    id:               "locationsTable"
    headerTitle:      "Top Locations Near Your Area"
    data:             toplocationsList

  filterlocationsTextField = Ti.UI.createTextField
    id:               "regularTextField"
    top:                window.height-160
    width:              window.width-50
    borderStyle:        Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    hintText:           'Filter Locations'
    clearOnEdit:        'true'
    
  Ti.API.debug toplocationsView.height
  window.add toplocationsView
  window.add locationsTable
  window.add filterlocationsTextField

  window
