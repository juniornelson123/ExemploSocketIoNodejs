module.exports = function(app){
	var ChatController = {
		index: function(req, res){
			var params = {sala: req.query.sala,dest: req.query.dest}
			res.render('chat/index', params)
		}
	}

	return ChatController
}