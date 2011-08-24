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
    Ti.API.debug 'Tab Group initialized'
    FillMeUp.App.tabGroup = Ti.UI.createTabGroup()

    # Top Locations Tab
    toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow
      title:            'Top Locations'
      id:               'toplocationsWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.toplocationsTab = Ti.UI.createTab
      id:               'toplocationsTab'
      className:        'tabElement'
      title:            'Top Locations'
      window:           toplocationsWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.toplocationsTab

    # Updates Tab
    updatesWindow = FillMeUp.Views.Updates.createMainWindow
      title:            'Updates'
      id:               'updatesWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.updatesTab = Ti.UI.createTab
      id:               'updatesTab'
      className:        'tabElement'
      title:            'Updates'
      window:           updatesWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.updatesTab

    # Profile Tab
    profileWindow = FillMeUp.Views.Profile.createMainWindow
      title:            'Profile'
      id:               'profileWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.profileTab = Ti.UI.createTab
      id:               'profileTab'
      className:        'tabElement'
      title:            'Profile'
      window:           profileWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.profileTab

    # Search Tab
    searchWindow = FillMeUp.Views.Search.createMainWindow
      title:            'Search'
      id:               'searchWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.searchTab = Ti.UI.createTab
      id:               'searchTab'
      className:        'tabElement'
      title:            'Search'
      window:           searchWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.searchTab

    # Facebook Tab
    facebookWindow = FillMeUp.Views.Facebook.createMainWindow
      title:            'Facebook'
      id:               'facebookWindow'
      orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
    FillMeUp.App.facebookTab = Ti.UI.createTab
      id:               'facebookTab'
      className:        'tabElement'
      title:            'Facebook'
      window:           facebookWindow

    # Bottom Tab Loader
    FillMeUp.App.tabGroup.addTab FillMeUp.App.facebookTab

    FillMeUp.App.tabGroup.addEventListener 'focus', (e) ->
      FillMeUp.App.currentTab = e.tab
      Ti.API.info(FillMeUp.App.currentTab)

    # Open Tabs
    FillMeUp.App.tabGroup.open()
