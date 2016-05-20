'use strict';
let x = "disable JSLint";
/* https://github.com/adobe/brackets/issues/11632 */

// These constants deal mainly with appearance
const NODE_RADIUS = 10;

// Name aliases
const LEFT = -1;
const STRAIGHT = 0;
const RIGHT = 1; 
const NO_LOOP = false;
const LOOP = true;

// The main datastructure
// Represents a section in the story
function Node(id, left, straight, right, seen) {
    this.id = id;
    this.left = left;
    this.straight = straight
    this.right = right;
    this.seen = seen;
}
 
// THE MODEL
//A list of sections with links to other sections. This is the order they should appear in the no-script version of the website.
const nodeMap = {
    "Title": new Node("Title"
                      , "Yes"
                      , "Maybe"
                      , "No"
                      , true
                      ),
    "Yes": new Node("Yes"
                    , null
                    , null
                    , null
                    , false
                    ),
    "No": new Node("No"
                   , null
                   , null
                   , null
                   , false
                   ), 
    "Maybe": new Node("Maybe"
                      , "Title"
                      , null
                      , null
                      , null
                      , false)
};

// Getter for the model
function getNode(id) {
    return nodeMap[id];
}


// ON SITE LOAD

// Initialize the model
let staged = getNode("Title");

// Initialize the view
$('section:not(#Title)').hide();
refreshTree();
selectCircle("Title");

// Initialize the controller
// BINDING FUNCTIONS TO DOM ELEMENTS CRITERIA
$(".takeLeft").click(takeLeft);
$(".takeRight").click(takeRight);
$(".takeStraight").click(takeStraight);
$(".testButton").click(testButton);
// TODO: STRIP MANUAL JUMPS PAGE JUMPS WITH JQUERY
// TODO: ADD MANUAL PAGE JUMPS


// Aliasing controller commands
function takeLeft() {
    stageNode(staged.left);
}


function takeStraight() {
    stageNode(staged.straight)
}

function takeRight() {
    
    stageNode(staged.right);
}


function stageNode(id) {
    
    // Update the model
    staged = getNode(id);
    staged.seen = true;
    
    // Refresh the view
    refreshTree();
    selectCircle(id);
    
    // Mount the requested section
    // and unmount all others
    
    // DOM MANIPULATION CRITERIA
    $('section#' +id).show();
    $('section:not(#' + id + ')').hide();
}


function testButton() {
    drawArrow(100, 20, 60, 60, -1);
}

function refreshTree() {
    $("svg#tree circle").remove();
    $("svg#tree path").remove();
    renderTree(150, 100, getNode("Title"), 0);
}


// Workaround for JQuery's inability to append to SVG properly without using a .xhtml file
// REFERENCE: http://chubao4ever.github.io/tech/2015/07/16/jquerys-append-not-working-with-svg-element.html
// <not my code>

function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

// </not my code>


function drawNewCircle(x, y, id, parent) {
    
    let stageNodeWithID =  function() {
        stageNode(id);
    }
    
        $(SVG('circle'))
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', NODE_RADIUS)
            .attr('stroke', "black")
            .attr('stroke-width', "1")
               // TODO: Start hidden
            .attr('fill', "grey")
            .attr('id', id)
            .click(stageNodeWithID)
            .appendTo($("svg#tree"));
}



function drawArrow(x1, y1, x2, y2, direction, loop) {
    
    const PADDING = 5 
    
    let ax1 = x1 + (direction * NODE_RADIUS);        
    let ay1 = y1 + (!(direction) * (NODE_RADIUS + PADDING));
    
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


// HERE BE DRAGONS
function renderTree(x, y, node, pull_tier) {
    drawNewCircle(x, y, node.id);
    console.log("RENDERING " + node.id);
    
    let push_tier = pull_tier + 1; 
    
    let left = getNode(node.left);
    let straight = getNode(node.straight)
    let right = getNode(node.right);
    
    
    const VERTICAL_SPACING = 60 - (20 * pull_tier);
    const HORIZONTAL_SPACING = 40 - (20 * pull_tier);
    
    if (left !== undefined && left.seen) {
        
        if ($("circle#" + left.id).length) {
            let cx = $("circle#" + left.id).attr('cx');
            let cy = $("circle#" + left.id).attr('cy');
            
            drawArrow(x, y, cx - NODE_RADIUS, cy, LEFT, LOOP, push_tier);
        }
    
        else {
            renderTree(x - HORIZONTAL_SPACING, y + VERTICAL_SPACING, left, push_tier);
            drawArrow(x, y, x - HORIZONTAL_SPACING , y + VERTICAL_SPACING, LEFT, NO_LOOP);
        }
    }
    
    if (straight !== undefined && straight.seen) {
        renderTree(x, y + VERTICAL_SPACING, straight);
        drawArrow(x, y, x, y + VERTICAL_SPACING, STRAIGHT, NO_LOOP, push_tier)
        
    }
    
    if (right !== undefined && right.seen) {
        
        if ($("circle#" + right.id).length) {
            let cx = $("circle#" + right.id).attr('cx');
            let cy = $("circle#" + right.id).attr('cy');
            
            drawArrow(x, y, cx + NODE_RADIUS, cy, RIGHT, LOOP, push_tier);
        }
        
        else {
            renderTree(x + HORIZONTAL_SPACING, y + VERTICAL_SPACING, right, push_tier);
            drawArrow(x, y, x + HORIZONTAL_SPACING, y + VERTICAL_SPACING, RIGHT, NO_LOOP);
        }
    }
}


