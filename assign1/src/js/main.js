'use strict';
let x = "disable JSLint"
/* https://github.com/adobe/brackets/issues/11632 */

function Node(id, data, left, right) {
    this.id = id;
    this.data = data; /* TODO: Remove */
    this.left = left;
    this.right = right;
}
 

function singleton(id, data) {
    return new Node(start, value, null, null);
}


const look_up = {
    "Title": new Node("Title", "Are you a meme?", "Yes", "No"),
    "Yes": new Node("Yes", "You're a meme", null, null),
    "No": new Node("No", "You're not a meme", null, null)
};

let staged = get_node("Title");
$('section:not(#Title)').hide();

$(".takeLeft").click(take_left);
$(".takeRight").click(take_right);


function get_node(id) {
    return look_up[id];
}

function take_left() {
    /* Will fail on null, don't abuse */
    staged = get_node(staged.left);
    $('section').show();
    $('section:not(#' + staged.id + ')').hide();
    
    console.log("Went left");
    return staged;
}

function take_right() {
    /* Will fail on null, don't abuse */
    stagedText = get_node(staged.right);
    $('section').show();
    $('section:not(#' + staged.id + ')').hide();
    console.log("Went right");
    return staged;
}