$().ready(function(){
	
	var answerEl = $( '#answer' );
	var errorEl = $( '#error' );
	var loadingEl = $( '#loading' );

	answerEl.hide();
	errorEl.hide();
	loadingEl.hide();
	$( '#send' ).click(function() {
		
		answerEl.hide();
		errorEl.hide();
		loadingEl.show();
		var sentence = $( '#sentence' ).val();
		
		$.ajax({
			type: 'GET',
	        url : 'getSentiment?sentence=' + sentence,
	        contentType: false,
	        processData: false,
	        dataType: 'json',
	        success : function(response) {
	        	if(response.hasOwnProperty('error')){
	        		answerEl.hide();
					errorEl.text(response.error);
					loadingEl.hide();
					errorEl.show();
				}
				else{
					errorEl.hide();
					var score = response.sentiment.document.score;
					var score_format = (Math.round(Math.abs(parseFloat(score)*100))) + '%';
		        	var sentiment = response.sentiment.document.label;
		        	var lang = response.language;
		        	$( '#sentiment-ans' ).text(sentiment);
		        	$( '#conf-ans' ).text(score_format);
		        	$( '#lang-ans' ).text(lang);
		        	loadingEl.hide();
					answerEl.show();
					var d = new Date();
					var n = d.getTime();
					var data_body = {"sentence": sentence, "sentiment": sentiment, "score": score_format, "lang": lang, "ts": n};
					save(JSON.stringify(data_body)).then(function(data){
						showHistory();
					})
					.catch((err) => alert(err))
				}

	        },
	        error : function(request, textStatus, errorThrown) {
	            alert(request.status + ', Error: ' + request.statusText);
	        }
		});
	
	});

	function save(data_body){
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url : 'addSentence',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: data_body,		
				success : function(response) {
					resolve(response);
				},
				error : function(request, textStatus, errorThrown) {
					reject(request.status + ', Error: ' + request.statusText);
				}
			});
		})
	}

	function showHistory(){
		$.ajax({
			type: 'GET',
			url : 'listHistory',
			contentType: "application/json; charset=utf-8",
			dataType: "json",		
			success : function(response) {
				$("#hist_table tbody").remove();
				$.each( response, function( key, value ) {
					$('#hist_table').append(
						'<tr> \
							<td>' + value.sentence + '</td> \
							<td>' + value.sentiment + '</td> \
							<td>' + value.score + '</td> \
							<td>' + value.lang + '</td> \
						</tr>'
					);
				});
			},
			error : function(request, textStatus, errorThrown) {
				alert(request.status + ', Error: ' + request.statusText);
			}
		});
	};

	showHistory();
		
});
