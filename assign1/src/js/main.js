'use strict';
let x = "This string prevents JSLint from running";
/* https://github.com/adobe/brackets/issues/11632 */

/* ---------------------------------------------- */
/* ### TO THE MARKER ### */
/* ---------------------------------------------- */

/*
I've been told to indicate places where I've done some things, so you don't
have to search through my code to see if I've fulfilled the necessary criteria.

NOTE: Not exhaustive. 

1. I manipulate the DOM in the ENTRY POINT section and the stageNode function
2. I manipulate the SVG model in selectNode
3. I bind on-click events to DOM elements and SVG elements in ENTRY POINT section and
drawNode respectively.
4. I add hover-effects in TODO
*/

/* ---------------------------------------------- */
/* ### CONSTANTS ### */
/* ---------------------------------------------- */

// These constants deal mainly with appearance
const NODE_RADIUS = 10;

// Value aliases
const LEFT = -1;
const STRAIGHT = 0;
const RIGHT = 1; 
const NO_LOOP = false;
const LOOP = true;

/* ---------------------------------------------- */
/* ### THE MODEL ### */
/* ---------------------------------------------- */

// The main datatype
// Represents a section in the story
function Node(id, left, straight, right, seen) {
    this.id = id;
    this.left = left;
    this.straight = straight
    this.right = right;
    this.seen = seen;
}
 
// The main datastrcuture
//A hashmap of section names, to sections. This is the order they should appear in the no-script version of the website.
const nodeMap = {
    "TITLE": new Node("TITLE"
                      , null
                      , "MAIN"
                      , null
                      , true
                      ),
    
    "MAIN": new Node("MAIN"
                      , "FOLLOW"
                      , null
                      , "HOTEL"
                      , true
                      ),
    "FOLLOW": new Node("FOLLOW"
                    , "ACCEPT"
                    , null
                    , "ESCAPE"
                    , false
                    ),
    "HOTEL": new Node("HOTEL"
                   , "THREATEN"
                   , null
                   , "SELFDOUBT"
                   , false
                   ), 
    "ESCAPE": new Node("ESCAPE"
                   , "MAIN"
                   , null
                   , "KNOWING"
                   , false
                   ),
    "SELFDOUBT": new Node("SELFDOUBT"
                   , null
                   , "PILLOW"
                   , null
                   , false
                   ), 
};

// Getter for the model
function getNode(id) {
    return nodeMap[id];
}

/* ---------------------------------------------- */
/* ### THE CONTROLLER */
/* ---------------------------------------------- */

function stageNode(id) {
    
    console.log("STAGING" + id)
    
    // Update the model
    staged = getNode(id);
    staged.seen = true;
    
    // Refresh the view
    refreshTree();
    selectNode(id);
    
    // Mount the requested section
    // and unmount all others
    $('section#' +id).show();
    $('section:not(#' + id + ')').hide();
    
    window.scrollTo(0, 0);
}

function takeLeft() {
    stageNode(staged.left);
}


function takeStraight() {
    stageNode(staged.straight)
}

function takeRight() {
    stageNode(staged.right);
}


function testButton() {
    drawArrow(100, 20, 60, 60, -1);
}

/* ---------------------------------------------- */
/* ### THE VIEW ### */
/* ---------------------------------------------- */

// Workaround for JQuery's inability to append to SVG properly without using a .xhtml file
// REFERENCE: http://chubao4ever.github.io/tech/2015/07/16/jquerys-append-not-working-with-svg-element.html

// <NOT MY CODE>
function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}
// </NOT MY CODE>


function drawNode(x, y, id, parent) {
    
    let stageNodeWithID =  function() {
        stageNode(id);
    }
    
        $(SVG('circle'))
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', NODE_RADIUS)
            .attr('stroke', "#073642")
            .attr('stroke-width', "2")
            .attr('fill', "#839496")
            .attr('id', id)
            .click(stageNodeWithID)
            .appendTo($("svg#tree"));
}

function selectNode(id) {
    $("circle").attr('fill', "#839496")
    $("circle#" + id).attr('fill', "#d33682");
}


function drawArrow(x1, y1, x2, y2, direction, loop) {
    // Where direction is -1, 0, 1 for left, straight, right
    // Where loop is a boolean
    
    // Do you want the arrow to touch its target?
    const PADDING = 5
    
    // Start from LHS, bottom side or RHS of the origin node
    let ax1 = x1 + (direction * NODE_RADIUS);        
    let ay1 = y1 + (!(direction) * (NODE_RADIUS + PADDING));
    
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    
    // Loops (backtracking) don't go straight to their target
    // They do a funny bendy thing
    if (loop) {
        var xc = x1;
        var yc = (y2) - dy;
    }
    else {
        var xc = (x1 + dx * direction);
        var yc = (y1);
    }
    
    // Always arrive at the top of the destination node
    let ax2 = x2;
    let ay2 = y2 - NODE_RADIUS - PADDING;
    
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
    let pth = 'M' +  ax1 + ' ' + ay1 + " Q" + xc + ' ' + yc + ", " + ax2 + ' ' + ay2;
    
    $(SVG('path'))
        .attr('d', pth)
        .appendTo($("svg#tree"));
}

// HERE BE DRAGONS
// In all honesty, this is pretty bad code. 
// It could probably be simplified by having the draw arrow auto-detect 
// what direction it's being drawn in and adjusting 
// its appearance accordingly. Instead, you've got... this
function renderTree(x, y, node, tier) {
    drawNode(x, y, node.id);
    console.log("RENDERING " + node.id);
    
    let left = getNode(node.left);
    let straight = getNode(node.straight)
    let right = getNode(node.right);
    
    const X_SHIFT = 40 - (20 * tier);
    const Y_SHIFT = 60 - (20 * tier);
    
    if (left !== undefined && left.seen) {
        
        if ($("circle#" + left.id).length) {
            let cx = $("circle#" + left.id).attr('cx');
            let cy = $("circle#" + left.id).attr('cy');
            
            drawArrow(x, y, cx - NODE_RADIUS, cy, LEFT, LOOP);
        }
        else {
            renderTree(x - X_SHIFT, y + Y_SHIFT, left, tier + 1);
            drawArrow(x, y, x - X_SHIFT , y + Y_SHIFT, LEFT, NO_LOOP);
        }
    }
    
    if (straight !== undefined && straight.seen) {
        renderTree(x, y + Y_SHIFT, straight, tier + 1);
        drawArrow(x, y, x, y + Y_SHIFT, STRAIGHT, NO_LOOP)
        
    }
    
    if (right !== undefined && right.seen) {
        
        if ($("circle#" + right.id).length) {
            let cx = $("circle#" + right.id).attr('cx');
            let cy = $("circle#" + right.id).attr('cy');
            
            drawArrow(x, y, cx + NODE_RADIUS, cy, RIGHT, LOOP)
        }
        else {
            renderTree(x + X_SHIFT, y + Y_SHIFT, right, tier + 1);
            drawArrow(x, y, x + X_SHIFT, y + Y_SHIFT, RIGHT, NO_LOOP);
        }
    }
}

function refreshTree() {
    $("svg#tree circle").remove();
    $("svg#tree path").remove();
    renderTree(150, 100, getNode("TITLE"), 0);
}

/* ---------------------------------------------- */
/* ### ENTRY POINT ### */
/* ---------------------------------------------- */

// Initialize the model
let staged = getNode("TITLE");

// Initialize the view
$('section:not(#TITLE)').hide();
refreshTree();
selectNode("TITLE");

// Initialize the controller
$(".takeLeft").click(takeLeft);
$(".takeRight").click(takeRight);
$(".takeStraight").click(takeStraight);
$(".testButton").click(testButton);
// TODO: STRIP MANUAL JUMPS PAGE JUMPS WITH JQUERY
// TODO: ADD MANUAL PAGE JUMPS


