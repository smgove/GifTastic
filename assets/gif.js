//When submit button is clicked!
$("#addAnimal").click(function () {
    //grab values from the text box:
    var btnTxt = $("#animal-input").val();

    // if btnTxt is empty don't do anything if not execute the code.

    if (btnTxt === "") {
            //do nothing
            //focus on the textbox
            $("#animal-input").focus();
    } else {
        //create new variable for new button with class of animalBTN
        var newbtn = $("<button class='animalBTN'>");
        //add the text inside newbtn
        //add value attribute to the button
        newbtn.attr("value", btnTxt);
        //add text the button
        newbtn.text(btnTxt);
        //append the new button in the div called animalSwitch
        $("#animalSwitch").append(newbtn);

        //clean the textbox
        $("#animal-input").val("");
        //focus on the text box
        $("#animal-input").focus();
    }
    //Prevent submit button from refreshing page.
    return false;
})

$("#animalSwitch").on("click", "button", function(res){


/////////////////Searching Giphy part
///api key from giphy
var apikey = "6rvZikSkdbHSZ8jxAXPHuGvVUge4Yj0T";

//host and path
var fullpath = "https://api.giphy.com/v1/gifs/search";

//limit the number of images
var limit = 10;

var search = this.value; // search for car for now. 
//later change this to button value

//adding api key to the search
fullpath = fullpath+"?api_key="+apikey;

//adding search question:
fullpath = fullpath+"&q="+search;

//adding limit return
fullpath = fullpath+"&limit="+limit;

//ajax part
$.ajax({"url": fullpath,
        "method": "GET"
    }).then(function(response){

        //empty animal div
        $("#animals").html("");

        for(var i =0; i<response.data.length; i++){
        
        ///console log response
        console.log(response);
        //still image url
        console.log(response.data[i].images.downsized_still.url);
        //animated image url:
        console.log(response.data[i].images.downsized.url);

        //get the rating
        console.log(response.data[i].rating);
        
        //making new image:
        var newImage = $("<img class='imgAnimate'>");
        //initially the path should still image
        newImage.attr("src", response.data[i].images.fixed_height_still.url);
        //save animated image path in the data-path attribute
        newImage.attr("data-animate", response.data[i].images.fixed_height.url);

        newImage.attr("data-still", response.data[i].images.fixed_height_still.url);

        //make the status of img to still
        newImage.attr("data-state", "still");
        //add animate / still function to each img. instead of using $(".containerdiv").on("click", "imgAnimate", function(){}
        newImage.on("click", playGif);
        var newdiv = $("<div class='containerdiv'>");
        var ratingDiv = $("<div class='ratingDiv'>");
        ratingDiv.text("Rating: "+response.data[i].rating.toUpperCase());
            newdiv.append(ratingDiv);
            newdiv.append(newImage);

        $("#animals").prepend(newdiv);
        
        }

});

});

$(document).on("click", "img", function(){
    alert(this.attr("data-still"));
});


//playgif will play and still the image animation
function playGif(){
    var state = $(this).attr("data-state");
			    
			if (state == "still") {
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-state", "animate");
			} else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}
}