'use strict';
let x = "disable JSLint";
/* https://github.com/adobe/brackets/issues/11632 */

const NODE_RADIUS = 10

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
// drawNewCircle(50, 50, "Title", null);
// selectCircle("Title");
renderTree(100, 20, staged);

$(".takeLeft").click(takeLeft);
$(".takeRight").click(takeRight);
$(".testButton").click(testButton);
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


function testButton() {
    drawArrow(100, 20, 60, 60);
}

function refreshTree() {
    $("circle").remove();
    renderTree(100, 20, getNode("Title"));
}

// Workaround for JQuery's inability to append to SVG
// http://chubao4ever.github.io/tech/2015/07/16/jquerys-append-not-working-with-svg-element.html
// OPEN "NOT MY CODE BLOCK"
function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function drawNewCircle(x, y, id, parent) {
        $(SVG('circle'))
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', NODE_RADIUS)
            .attr('stroke', "black")
            .attr('stroke-width', "1")
               // TODO: Start hidden
            .attr('fill', "grey")
            .attr('id', id)
            .appendTo($("svg#tree"));
}

// CLOSE "NOT MY CODE BLOCK"


function drawArrow(x1, y1, x2, y2, direction) {
    
    // Where direction is -1 for left, 1 for right
   
    let ax1 = x1 + (direction * 0.707 * (NODE_RADIUS / 2));
    let ay1 = y1 + (0.707 * (NODE_RADIUS / 2));
    let ay2 = y2 - NODE_RADIUS;
    
    let dx = (x2 - x1);
    let dy = (y2 - y1);
    
    // control point
    let xc = (x1 + dx) * direction;
    let yc = (y2 - y1);
    
    let pth = 'M' + ax1 + ' ' + ax2 + " Q" + xc + ' ' + yc + ", " + x2 + ' ' + ay2 
   
    $(SVG('path'))
        .attr('d', "M0 0 Q50 0, 100 100")
        .appendTo($("svg#tree"));
}

function selectCircle(id) {
    $("circle").attr('fill', "grey")
    $("circle#" + id).attr('fill', "white");
}

function renderTree(x, y, node) {
    
    
    
    // if node.seen === true;
    drawNewCircle(x, y, node.id);
    
    let left = getNode(node.left);
    let right = getNode(node.right);
    
    if (left !== undefined 
        && !$("circle#" + left.id).length) {
        renderTree(x - 40, y + 40, left);
    }
    
    if (right !== undefined
        && !$("circle#" + right.id).length) {
        renderTree(x + 40, y + 40, right);
    }
}

