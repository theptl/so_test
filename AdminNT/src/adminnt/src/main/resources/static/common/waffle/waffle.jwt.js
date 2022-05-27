
(function() {
	
	var jwt = waffle.on("jwt");
	
	
	
	
	
	jwt.parse = function(token) {
		var composite = token.split('.');
        var header = composite[0].replace('-', '+').replace('_', '/');
        var payload = composite[1].replace('-', '+').replace('_', '/');
        
        var ret = {
        		header: JSON.parse(window.atob(header)),
        		payload: JSON.parse(window.atob(payload)),
        };
        return ret;
	};
})();