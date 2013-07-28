console.log("hii");

var $div = generate_element(20, 30, 20, 50);
$div.click(function(){ /* ... */ });
$("div#main").html($div);

var json = {
  width: 20,
  height: 40,
  w_offset: 14,
  h_offset: 80,
  color: "blue",
  children: [{
    width: 10,
    h_offset: 5,
    height: 10,
    v_offset: 10,
    color: "purple"
  }]
}


function gen_phone (json) {
  var node = generateElement(json.width, json.h_offset, json.height, json.v_offset);
  if (json.children) {
  }

}

function generate_element(width, h_offset, height, v_offset) {
  return $("<div>", {id: "foo", 
    class: "a", 
    style: ["width: " , width , "px;",
    "position: relative;",
    "left: " , h_offset, "px;",
    "height: " , height, "px;",
    "top: " , v_offset, "px;",
    "background-color: blue;"].join("")
  });
}
