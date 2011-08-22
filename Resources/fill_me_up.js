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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButton, loginButtonLabel, loginView, nameTextField, passwordTextField, window;
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
    loginButton = Ti.UI.createButton({
      id: 'loginButton',
      backgroundImage: 'images/button_login.png',
      height: 88,
      width: 85,
      top: 132,
      left: window.width - 98,
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
    window.add(loginButton);
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButton, loginButtonLabel, loginView, nameTextField, passwordTextField, window;
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
    loginButton = Ti.UI.createButton({
      id: 'loginButton',
      backgroundImage: 'images/button_login.png',
      height: 88,
      width: 85,
      top: 132,
      left: window.width - 98,
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
    window.add(loginButton);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Main.createMainWindow = function(options) {
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButton, loginButtonLabel, loginView, nameTextField, passwordTextField, window;
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
    loginButton = Ti.UI.createButton({
      id: 'loginButton',
      backgroundImage: 'images/button_login.png',
      height: 88,
      width: 85,
      top: 132,
      left: window.width - 98,
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
    window.add(loginButton);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Main.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButton, loginButtonLabel, loginView, nameTextField, passwordTextField, window;
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
    loginButton = Ti.UI.createButton({
      id: 'loginButton',
      backgroundImage: 'images/button_login.png',
      height: 88,
      width: 85,
      top: 132,
      left: window.width - 98,
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
    window.add(loginButton);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Main.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Settings.createMainWindow = function(options) {
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
      var mainWindow, settingsWindow;
      FillMeUp.App.tabGroup = Ti.UI.createTabGroup();
      mainWindow = FillMeUp.Views.Main.createMainWindow({
        title: 'Main',
        id: 'mainWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.mainTab = Ti.UI.createTab({
        id: 'mainTab',
        className: 'tabElement',
        title: 'Main',
        window: mainWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.mainTab);
      settingsWindow = FillMeUp.Views.Settings.createMainWindow({
        title: 'Settings',
        id: 'settingsWindow',
        orientationModes: FillMeUp.Helpers.Application.createOrientiationModes
      });
      FillMeUp.App.settingsTab = Ti.UI.createTab({
        id: 'settingsTab',
        className: 'tabElement',
        title: 'Settings',
        window: settingsWindow
      });
      FillMeUp.App.tabGroup.addTab(FillMeUp.App.settingsTab);
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
  FillMeUp.Views.Login.createMainWindow = function(options) {
    var loginButton, loginButtonLabel, loginView, nameTextField, passwordTextField, window;
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
    loginButton = Ti.UI.createButton({
      id: 'loginButton',
      backgroundImage: 'images/button_login.png',
      height: 88,
      width: 85,
      top: 132,
      left: window.width - 98,
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
    window.add(loginButton);
    window.add(loginButtonLabel);
    return window;
  };
  FillMeUp.Views.Main.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Sample.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Settings.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
  FillMeUp.Views.Welcome.createMainWindow = function(options) {
    var window;
    window = Ti.UI.createWindow(options);
    return window;
  };
}).call(this);
