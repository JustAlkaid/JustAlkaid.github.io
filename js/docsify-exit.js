(function() {
    var install = function(hook, vm) {
      hook.beforeEach(function(content) {
        var url = vm.route.path;
        if (url === '/index.html') {
          window.location.href = '../../index.html';
        }
        return content;
      });
    };
  
    window.$docsify.plugins = [].concat(install, window.$docsify.plugins || []);
  })();