'use strict';
let x = "disable JSLint";
/* https://github.com/adobe/brackets/issues/11632 */

// The main datastructure
function Node(id, left, right, seen) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.seen = seen;
}
 
//A list of chapters with links to other chapters. This is the order they should appear in the no-script version of the website.
const nodeMap = {
    "Title": new Node("Title", "Yes", "No", true),
    "Yes": new Node("Yes", "Title", "Title", false),
    "No": new Node("No", "Title", "Title", false)
};

// Start of the story
let staged = getNode("Title");

// Progressive enhance when in noscript
$('section:not(#Title)').hide();

$(".takeLeft").click(takeLeft);
$(".takeRight").click(takeRight);
// TODO: STRIP MANUAL JUMPS PAGE JUMPS WITH JQUERY
// TODO: ADD MANUAL PAGE JUMPS


function getNode(id) {
    return nodeMap[id];
}

function takeLeft() {
    staged = getNode(staged.left);
    staged.seen = true;
    $('section#' + staged.id).show()
    $('section:not(#' + staged.id + ')').hide();
    console.log("Went left");
    return staged; // prevents use of <a onClick...
}

function takeRight() {
    staged = getNode(staged.right);
    staged.seen = true;
    $('section#' + staged.id).show()
    $('section:not(#' + staged.id + ')').hide();
    console.log("Went right");
    return staged;
}




