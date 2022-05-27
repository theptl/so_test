
(function() {
	
	var api = waffle.on("api");
	
	
	
	
	
	api.getSystemCodes = function(async, groupCode, success) {
		$.ajax({
			type: "GET",
			url: "/nts/common/getSystemCodes",
			cache: false,
			async: async,
			data: {
				groupCode: groupCode
			},
			success: function (result) {
				success(result);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr);
			}
		});
	};
})();