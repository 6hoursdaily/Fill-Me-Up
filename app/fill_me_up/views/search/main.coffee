FillMeUp.Views.Search.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  mountainView = Ti.Map.createAnnotation
    latitude:             37.390749
    longitude:            -122.081651
    title:                "Appcelerator Headquarters"
    subtitle:             'Mountain View, CA'
    pincolor:             Ti.Map.ANNOTATION_RED
    animate:              true
    leftButton:           '/images/appcelerator_small.png'
    myid:                 1 # CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS

  mapview = Ti.Map.createView
    mapType:              Ti.Map.STANDARD_TYPE
    region:
      latitude:           33.74511
      longitude:          -84.38993
      latitudeDelta:      0.01
      longitudeDelta:     0.01
    animate:              true
    regionFit:            true
    userLocation:         true
    annotations:          [mountainView]

  window.add mapview
  window
