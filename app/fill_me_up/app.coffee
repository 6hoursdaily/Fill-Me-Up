FillMeUp.App =

  showLogin: ->
    loginWindow = Ti.UI.createWindow()
    login = FillMeUp.Views.Login.createMainWindow
      title: 'Login to FillMeUp'
      id: 'loginWindow'

    FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup
      window: login

    loginWindow.add FillMeUp.App.SessionNavGroup

    #Ti.App.addEventListener 'login:success', (e) ->
    #  rootWindow.close()

    loginWindow.open()

  initTabGroup: ->
    FillMeUp.App.tabGroup = Ti.UI.createTabGroup()

    # Main Tab
    mainWindow = FillMeUp.Views.Main.createMainWindow
      title:            'Main'
      id:               'mainWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.mainTab = Ti.UI.createTab
      id:               'mainTab'
      className:        'tabElement'
      title:            'Main'
      window:           mainWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.mainTab

    # Settings Tab
    settingsWindow = FillMeUp.Views.Settings.createMainWindow
      title:            'Settings'
      id:               'settingsWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes

    FillMeUp.App.settingsTab = Ti.UI.createTab
      id:               'settingsTab'
      className:        'tabElement'
      title:            'Settings'
      window:           settingsWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.settingsTab

    FillMeUp.App.tabGroup.addEventListener 'focus', (e) ->
      FillMeUp.App.currentTab = e.tab
      Ti.API.info(FillMeUp.App.currentTab)

    # Open Tabs
    FillMeUp.App.tabGroup.open()
