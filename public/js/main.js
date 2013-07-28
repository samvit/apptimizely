console.log("hii");

//x = horizontal offset
//y = vertical offset
var json = {
  width: 20,
  height: 40,
  x: 14,
  y: 80,
  color: "blue",
  children: [{
    width: 10,
    x: 5,
    height: 10,
    y: 10,
    color: "purple"
  },
  {
    width: 10,
    x: 30,
    height: 10,
    y: 10,
    color: "black"
  }]
};


// var $div = generate_element(20, 30, 20, 50);
// $div.click(function(){ /* ... */ });
// $("div#main").html($div);

function gen_editor (element_info) {
  //element_info is {x,y,width,height,text,color}
  return $("<div>", {id: "editor", }).append([
      editor_row("height", element_info.height),
      editor_row("x", element_info.x),
      editor_row("width", element_info.width),
      editor_row("y", element_info.y),
      editor_row("text", element_info.text),
      editor_row("color", element_info.color),
      $("<button>", {value: "Update", onClick: sendUpdate})
      ]);
}

function sendUpdate () {
  console.log("helli");
}

function editor_row (field, value) {
  //element_info is {x,y,width,height,text,color}
  return $("<div>", {id: field, }).html([
      $("<span>", {text: field + ": "}),
      $("<input>", {value: value})
    ]);
}

function reload () {
  var $ios = gen_tree(json);
  $("div#ios").html($ios);
  var $editor = gen_editor({ width: 10, x: 30, height: 10, y: 10, color: "black" });
  $("div#editor").html($editor);
}
reload();


function gen_tree (json) {
  var node = generate_element(json.width, json.x, json.height, json.y, json.color);
  console.log("node", node);
  if (json.children) {
    var children = json.children.map(gen_tree);
    node.append(children);
  }
  return node;
}

function generate_element(width, x, height, y, color) {
  console.log("gen_element",width, x, height, y);
  return $("<div>", {id: "foo", 
    class: "a", 
    style: ["width: " , width , "px;",
    "position: relative;",
    "left: " , x, "px;",
    "height: " , height, "px;",
    "top: " , y, "px;",
    "background-color: ", color, ";"].join("")
  });
}
