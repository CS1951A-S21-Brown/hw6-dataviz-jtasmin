// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
// let graph_1_width = window.innerWidth, graph_1_height = 800;
let graph_1_width = (MAX_WIDTH / 2) - 30, graph_1_height = 250;

let graph_2_width = 600, graph_2_height = 270;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 600;

// trim text function to make labels look nicer
function trimText(label) {
    if (label.length > 15) {
        return label.substring(0, 15) + "..."
    }
    return label;
}