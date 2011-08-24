FillMeUp.Views.Search.createMainWindow = (options) ->
  window  = Ti.UI.createWindow(options)

  # Define annotations
  annotation = Ti.Map.createAnnotation
	  latitude:             42.334537
	  longitude:            -71.170101
	  title:                "Boston College"
	  subtitle:             'Newton Campus, Chestnut Hill, MA'
	  animate:              true
	  leftButton:           '/images/atlanta.jpg'
	  image:                "/images/boston_college.png"

  mountainView = Ti.Map.createAnnotation
    latitude:             37.390749
    longitude:            -122.081651
    title:                "Appcelerator Headquarters"
    subtitle:             'Mountain View, CA'
    pincolor:             Ti.Map.ANNOTATION_RED
    animate:              true
    leftButton:           '/images/appcelerator_small.png'
    myid:                 1 # CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS

  # Define Region
  userRegion =
    latitude:             42.334537
    longitude:            -71.170101
    latitudeDelta:        0.010
    longitudeDelta:       0.018

  # Define Views
  mapview = Ti.Map.createView
    mapType:              Ti.Map.STANDARD_TYPE
    region:               userRegion
    animate:              true
    regionFit:            true
    userLocation:         true
    annotations:          [annotation]

  # parse routes from file
  f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'examples','route.csv')
  csv = f.read()
  points = []
  lines = csv.toString().split("\n")
  
  for item in lines
    latlong = item.split(",")
    if latlong.length > 1
      lat = latlong[0]
      lon = latlong[1]

    entry =
      latitude:     lat
      longitude:    lon

    points.push entry

  # add a route
  route =
    name:           "boston"
    points:         points
    color:          'red'
    width:          4

  # add route to the map
  mapview.addRoute route

  window.add mapview

  annotation.addEventListener 'click', (e) ->
    mapview.removeRoute route

  mapview.addEventListener 'click', (evt) ->
    clickSource = evt.clicksource
    Ti.API.info('mapview click clicksource = ' + clickSource)

  window
