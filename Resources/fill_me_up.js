(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Profile.createMainWindow = function(options) {
    var profileView, window;
    window = Ti.UI.createWindow(options);
    profileView = Ti.UI.createView({
      id: "profileView",
      backgroundColor: "white"
    });
    window.add(profileView);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Profile.createMainWindow = function(options) {
    var profileView, window;
    window = Ti.UI.createWindow(options);
    profileView = Ti.UI.createView({
      id: "profileView",
      backgroundColor: "white"
    });
    window.add(profileView);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Profile.createMainWindow = function(options) {
    var profileView, window;
    window = Ti.UI.createWindow(options);
    profileView = Ti.UI.createView({
      id: "profileView",
      backgroundColor: "white"
    });
    window.add(profileView);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Search.createMainWindow = function(options) {
    var searchTextField, searchView, window;
    window = Ti.UI.createWindow(options);
    searchView = Ti.UI.createView({
      id: "searchView",
      backgroundColor: "white"
    });
    searchTextField = Ti.UI.createTextField({
      id: "searchTextField"
    });
    window.add(searchView);
    window.add(searchTextField);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Profile.createMainWindow = function(options) {
    var profileView, window;
    window = Ti.UI.createWindow(options);
    profileView = Ti.UI.createView({
      id: "profileView",
      backgroundColor: "white"
    });
    window.add(profileView);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Search.createMainWindow = function(options) {
    var searchTextField, searchView, window;
    window = Ti.UI.createWindow(options);
    searchView = Ti.UI.createView({
      id: "searchView",
      backgroundColor: "white"
    });
    searchTextField = Ti.UI.createTextField({
      id: "searchTextField"
    });
    window.add(searchView);
    window.add(searchTextField);
    return window;
  };
  FillMeUp.Views.Toplocations.createMainWindow = function(options) {
    var filterlocationsTextField, item, locationsTable, toplocationsList, toplocationsRow, toplocationsView, window, _i, _len;
    window = Ti.UI.createWindow(options);
    toplocationsList = ['ITEM 1', 'ITEM 2', 'ITEM 3'];
    for (_i = 0, _len = toplocationsList.length; _i < _len; _i++) {
      item = toplocationsList[_i];
      Ti.API.debug(item);
      toplocationsRow = Ti.UI.createTableViewRow({
        id: 'toplocationsRow',
        title: item
      });
      toplocationsList.push(toplocationsRow);
    }
    toplocationsView = Ti.UI.createView({
      id: 'toplocationsView'
    });
    locationsTable = Ti.UI.createTableView({
      id: "locationsTable",
      headerTitle: "Top Locations Near Your Area",
      data: toplocationsList
    });
    filterlocationsTextField = Ti.UI.createTextField({
      id: "regularTextField",
      top: window.height - 160,
      width: window.width - 50,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Filter Locations',
      clearOnEdit: 'true'
    });
    Ti.API.debug(toplocationsView.height);
    window.add(toplocationsView);
    window.add(locationsTable);
    window.add(filterlocationsTextField);
    return window;
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty;
  FillMeUp.API = (function() {
    function API(login, password) {
      this.login = login;
      this.password = password;
    }
    API.prototype.requestURI = function(path, query) {
      var key, uri, value;
      if (query == null) {
        query = {};
      }
      FillMeUp.API_ENDPOINT = "http://fill_me_up.com/api/v1";
      uri = "" + FillMeUp.API_ENDPOINT + path + ".json?";
      for (key in query) {
        if (!__hasProp.call(query, key)) continue;
        value = query[key];
        uri += "" + key + "=" + (escape(value)) + "&";
      }
      uri = uri.replace(/^(&)/g, '');
      return uri;
    };
    API.prototype.request = function(path, options, authenticated) {
      var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
      if (authenticated == null) {
        authenticated = true;
      }
            if ((_ref = options.method) != null) {
        _ref;
      } else {
        options.method = 'GET';
      };
            if ((_ref2 = options.query) != null) {
        _ref2;
      } else {
        options.query = {};
      };
            if ((_ref3 = options.success) != null) {
        _ref3;
      } else {
        options.success = function() {
          return Ti.API.info;
        };
      };
            if ((_ref4 = options.error) != null) {
        _ref4;
      } else {
        options.error = function() {
          return Ti.API.error;
        };
      };
      xhr = Ti.Network.createHTTPClient();
      xhr.onreadystatechange = function(e) {
        var data;
        if (this.readyState === 4) {
          try {
            data = JSON.parse(this.responseText);
            if (data.error != null) {
              return options.error(data);
            } else {
              return options.success(data);
            }
          } catch (exception) {
            return options.error(exception);
          }
        }
      };
      uri = this.requestURI(path, options.query);
      xhr.open(options.method, uri);
      if (authenticated) {
        xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
      }
      message = "Executing ";
      message += authenticated ? "Authenticated " : "Unauthenticated ";
      message += "" + options.method + " " + uri;
      if (options.debug) {
        Ti.API.debug(message);
      }
      if (options.body != null) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(options.body);
        if (options.debug) {
          Ti.API.debug(data);
        }
        return xhr.send(data);
      } else {
        return xhr.send();
      }
    };
    API.prototype.get = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'GET';
      return this.request(path, options, authenticated);
    };
    API.prototype.post = function(path, options, authenticated) {
      if (authenticated == null) {
        authenticated = true;
      }
      options.method = 'POST';
      return this.request(path, options, authenticated);
    };
    return API;
  })();
  FillMeUp.App = {
    showLogin: function() {
      var login, loginWindow;
      loginWindow = Ti.UI.createWindow();
      login = FillMeUp.Views.Login.createMainWindow({
        title: 'Login to FillMeUp',
        id: 'loginWindow'
      });
      FillMeUp.App.SessionNavGroup = Ti.UI.iPhone.createNavigationGroup({
        window: login
      });
      loginWindow.add(FillMeUp.App.SessionNavGroup);
      return loginWindow.open();
    },
    initTabGroup: function() {
      var facebookWindow, profileWindow, searchWindow, toplocationsWindow, updatesWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      toplocationsWindow = FillMeUp.Views.Toplocations.createMainWindow({
        title: 'Top Locations',
        id: 'toplocationsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.toplocationsTab = Ti.UI.createTab({
        id: 'toplocationsTab',
        className: 'tabElement',
        title: 'Top Locations',
        window: toplocationsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.toplocationsTab);
      updatesWindow = FillMeUp.Views.Updates.createMainWindow({
        title: 'Updates',
        id: 'updatesWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.updatesTab = Ti.UI.createTab({
        id: 'updatesTab',
        className: 'tabElement',
        title: 'Updates',
        window: updatesWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.updatesTab);
      profileWindow = FillMeUp.Views.Profile.createMainWindow({
        title: 'Profile',
        id: 'profileWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.profileTab = Ti.UI.createTab({
        id: 'profileTab',
        className: 'tabElement',
        title: 'Profile',
        window: profileWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.profileTab);
      searchWindow = FillMeUp.Views.Search.createMainWindow({
        title: 'Search',
        id: 'searchWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.searchTab = Ti.UI.createTab({
        id: 'searchTab',
        className: 'tabElement',
        title: 'Search',
        window: searchWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.searchTab);
      facebookWindow = FillMeUp.Views.Facebook.createMainWindow({
        title: 'Facebook',
        id: 'facebookWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.facebookTab = Ti.UI.createTab({
        id: 'facebookTab',
        className: 'tabElement',
        title: 'Facebook',
        window: facebookWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.facebookTab);
      FillMeUp.App.tabGroup.addEventListener('focus', function(e) {
        FillMeUp.App.currentTab = e.tab;
        return Ti.API.info(FillMeUp.App.currentTab);
      });
      return FillMeUp.App.tabGroup.open();
    }
  };
  FillMeUp.Helpers.Application = {
    createOrientiationModes: function() {
      var modes;
      modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
      return modes;
    }
  };
  FillMeUp.Views.Facebook.createMainWindow = function(options) {
    var facebookButton, facebookLabel, facebookView, loginButton, window;
    window = Ti.UI.currentWindow(options);
    Titanium.Facebook.appid = "107384569364316";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
    facebookView = Ti.UI.createView({
      id: 'facebookView',
      backgroundColor: 'white'
    });
    facebookLabel = Ti.UI.createLabel({
      id: 'facebookLabel',
      text: 'Logged in = ' + Titanium.Facebook.loggedIn,
      font: {
        size: 14
      },
      height: 'auto',
      top: 10,
      textAlign: 'center'
    });
    facebookButton = Ti.UI.createButton({
      id: 'facebookButton',
      title: 'Force dialog: ' + Titanium.Facebook.forceDialogAuth,
      top: 50,
      width: 160,
      height: 40
    });
    facebookButton.addEventListener('click', function(e) {
      Titanium.Facebook.forceDialogAuth = !Titanium.Facebook.forceDialogAuth;
      facebookButton.title = 'Force dialog: ' + Titanium.Facebook.forceDialogAuth;
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('login', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    Titanium.Facebook.addEventListener('logout', function(e) {
      return facebookLabel.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
    });
    loginButton = Titanium.Facebook.createLoginButton({
      style: 'wide',
      bottom: 30
    });
    window.add(facebookView);
    window.add(facebookLabel);
    window.add(facebookButton);
    window.add(loginButton);
    return window;
  };
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButtonLabel, loginView, nameTextField, passwordTextField, window;
    window = Ti.UI.createWindow(options);
    loginView = Ti.UI.createView({
      id: 'baseView',
      width: window.width,
      height: window.height
    });
    nameTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 48,
      left: 10,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Username',
      clearOnEdit: 'true'
    });
    passwordTextField = Ti.UI.createTextField({
      id: 'loginTextField',
      top: 90,
      left: 10,
      hintText: 'Password',
      clearOnEdit: 'true',
      passwordMask: 'true',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    loginButtonLabel = Ti.UI.createLabel({
      id: 'loginButtonLabel',
      top: 132,
      left: window.width / 2 - 10,
      text: 'Wire In'
    });
    loginButtonLabel.addEventListener('click', function(e) {
      if (nameTextField.value === 'admin' && passwordTextField.value === 'admin') {
        window.close(loginView);
        return FillMeUp.App.initTabGroup();
      } else {
        return alert('Login is incorrect');
      }
    });
    window.add(loginView);
    window.add(nameTextField);
    window.add(passwordTextField);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Profile.createMainWindow = function(options) {
    var profileView, window;
    window = Ti.UI.createWindow(options);
    profileView = Ti.UI.createView({
      id: "profileView",
      backgroundColor: "white"
    });
    window.add(profileView);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Search.createMainWindow = function(options) {
    var searchTextField, searchView, window;
    window = Ti.UI.createWindow(options);
    searchView = Ti.UI.createView({
      id: "searchView",
      backgroundColor: "white"
    });
    searchTextField = Ti.UI.createTextField({
      id: "searchTextField"
    });
    window.add(searchView);
    window.add(searchTextField);
    return window;
  };
  FillMeUp.Views.Toplocations.createMainWindow = function(options) {
    var filterlocationsTextField, item, locationsTable, toplocationsList, toplocationsRow, toplocationsView, window, _i, _len;
    window = Ti.UI.createWindow(options);
    toplocationsList = ['ITEM 1', 'ITEM 2', 'ITEM 3'];
    for (_i = 0, _len = toplocationsList.length; _i < _len; _i++) {
      item = toplocationsList[_i];
      Ti.API.debug(item);
      toplocationsRow = Ti.UI.createTableViewRow({
        id: 'toplocationsRow',
        title: item
      });
      toplocationsList.push(toplocationsRow);
    }
    toplocationsView = Ti.UI.createView({
      id: 'toplocationsView'
    });
    locationsTable = Ti.UI.createTableView({
      id: "locationsTable",
      headerTitle: "Top Locations Near Your Area",
      data: toplocationsList
    });
    filterlocationsTextField = Ti.UI.createTextField({
      id: "regularTextField",
      top: window.height - 160,
      width: window.width - 50,
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      hintText: 'Filter Locations',
      clearOnEdit: 'true'
    });
    Ti.API.debug(toplocationsView.height);
    window.add(toplocationsView);
    window.add(locationsTable);
    window.add(filterlocationsTextField);
    return window;
  };
  FillMeUp.Views.Updates.createMainWindow = function(options) {
    var item, updatesList, updatesRow, updatesTable, updatesView, window, _i, _len;
    window = Ti.UI.createWindow(options);
    updatesList = ['UPDATE 1', 'UPDATE 2', 'UPDATE 3'];
    for (_i = 0, _len = updatesList.length; _i < _len; _i++) {
      item = updatesList[_i];
      updatesRow = Ti.UI.createTableViewRow({
        id: "updatesRow",
        title: item
      });
      updatesList.push(updatesRow);
    }
    updatesView = Ti.UI.createView({
      id: "updatesView"
    });
    updatesTable = Ti.UI.createTableView({
      id: "updatesTable",
      headerTitle: "Latest Updates",
      data: updatesList
    });
    window.add(updatesView);
    window.add(updatesTable);
    return window;
  };
}).call(this);
