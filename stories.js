//ready function
$(document).ready(function() {

	
	//show stories helper
	var showStories = function(data){
		var htmlStr='';
		
		for (i=0;i<data.length;i++)
		{
			var date = new Date(0); //0 sets date epoch
			date.setUTCSeconds(data[i].posted_at); //posted_at is in unix ts style (seconds)
			
			htmlStr += 	i+1 + ". " +
						"<a href='" + 
						data[i].link + 
						"'>" + 
						data[i].title +
						"</a> - " +
						data[i].points +
						" points - " + 
						$.timeago( date.toISOString() ) +
						"<br />";
		}
		
		$("div#stories").html(htmlStr);
	};

	
	//sortByPoints helper
	var sortByPoints=function( array ){
		array.sort(function(a, b){
			 var points1 = a.points,
				 points2 = b.points;
				 
			 return points2 - points1;  
		});
	};
	
	
	//sortByDate helper
	var sortByDate=function( array ){
		array.sort(function(a, b){
			 var date1 = a.posted_at,
				 date2 = b.posted_at;
				 
			 return date2 - date1;  
		});
	};
	
	 
	//sort by points click handler
	$("a#sort-points").click( function(){
		$('#menu a').removeClass('selected');
  		$(this).toggleClass('selected');
		sortByPoints(stories);
		showStories(stories);
		return false;
	});
	
	
	//sort by date click handler
	$("a#sort-date").click( function(){
		$('#menu a').removeClass('selected');
  		$(this).toggleClass('selected');
		sortByDate(stories);
		showStories(stories);
		return false;
	});
	
	
	//trending click handler  (bit basic as just does today)
	$("a#trending").click( function(){
		
		$('#menu a').removeClass('selected');
  		$(this).toggleClass('selected');
		
		//sort array by newest to oldest dates
		sortByDate(stories);
		
		//get todays date, convert to timstamp (seconds)
		var today = Math.round(+new Date()/1000);
		
		//get yesterdays date
		var yesterday = today - (60 * 60 * 24 * 1);
		//console.log(yesterday);
		
		//get stories posted since yesterday, save to a trending array
		var trending=[];
		for (i=0;i<stories.length;i++)
		{
			if(stories[i].posted_at > yesterday) {
				trending.push(stories[i]);
			} else {
				break;
			}
				
		}
		
		//sort by points and show
		sortByPoints(trending);
		showStories(trending);
		return false;
	
	});
	
	
	//load json data into stories array and show
	var stories=[];
	$.getJSON("stories.json", function(json) {
		stories=json;
		showStories(stories);
	});
	
	
});