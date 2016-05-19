'use strict';
let x = "disable JSLint";
/* https://github.com/adobe/brackets/issues/11632 */

const NODE_RADIUS = 10;
const LEFT = -1;
const RIGHT = 1;
const NO_LOOP = false;
const LOOP = true;

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
    "Yes": new Node("Yes", "Maybe", null, false),
    "No": new Node("No", null, null, false), 
    "Maybe": new Node("Maybe", "Title", null, false)
};

// Start of the story
let staged = getNode("Title");

// Progressive enhance when in noscript
$('section:not(#Title)').hide();
// drawNewCircle(50, 50, "Title", null);
// selectCircle("Title");
renderTree(300, 100, staged);

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
    drawArrow(100, 20, 60, 60, -1);
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


function drawArrow(x1, y1, x2, y2, direction, loop) {
    
    const PADDING = 5 
    
//    let ax1 = x1 + (direction * 0.707 * ((NODE_RADIUS / 2) + PADDING));
//    let ay1 = y1 + (0.707 * ((NODE_RADIUS / 2) + PADDING));
//    
    let ax1 = x1 + (direction * ((NODE_RADIUS / 2) + PADDING));        
    let ay1 = y1;
    
    let ax2 = x2;
    let ay2 = y2 - NODE_RADIUS - PADDING;
    
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    
    
    // control point
    
    if (loop) {
        var xc = x1;
        var yc = (y2) - dy;
    }
    else {
        var xc = (x1 + dx * direction);
        var yc = (y1);
    }

    
    let pth = 'M' +  ax1 + ' ' + ay1 + " Q" + xc + ' ' + yc + ", " + ax2 + ' ' + ay2;
    
   
    $(SVG('path'))
        .attr('d', pth)
        .appendTo($("svg#tree"));
}

function selectCircle(id) {
    $("circle").attr('fill', "grey")
    $("circle#" + id).attr('fill', "white");
}

function renderTree(x, y, node) {
    
    
    // if node.seen === true;
    drawNewCircle(x, y, node.id);
    console.log("RENDERING " + node.id);
    
    let left = getNode(node.left);
    let right = getNode(node.right);
    
    if (left !== undefined) {
        
        if ($("circle#" + left.id).length) {
            let cx = $("circle#" + left.id).attr('cx');
            let cy = $("circle#" + left.id).attr('cy');
            
            console.log(cx);
            console.log(cy);
    
            
            drawArrow(x, y, cx, cy, LEFT, LOOP);
        }
    
        else {
            renderTree(x - 40, y + 40, left);
            drawArrow(x, y, x - 40, y + 40, LEFT);
        }
    }
    
    if (right !== undefined) {
        
        if ($("circle#" + right.id).length) {
            let cx = $("circle#" + right.id).attr('cx');
            let cy = $("circle#" + right.id).attr('cy');
            
            console.log(cx);
            console.log(cy);
            
            drawArrow(x, y, cx, cy, RIGHT, LOOP);
        }
        
        else {
            renderTree(x + 40, y + 40, right);
            drawArrow(x, y, x + 40, y + 40, RIGHT, NO_LOOP);
        }
    }
}

