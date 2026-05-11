export const LEVELS = [
    {
        id: 1,
        score: 4,
        solution: { x: 500, y: 30 },
        holes: [
            { side: "top", start: 200, end: 400, color: null, opensAt: null }
        ]
    },
    {
        id: 2,
        score: 7,
        solution: { x: 20, y: 140 },
        holes: [
            { side: "left", start: 300, end: 500, color: null, opensAt: null },
            { side: "bottom", start: 300, end: 500, color: null, opensAt: null },
            { side: "right", start: 0, end: 100, color: null, opensAt: null }
        ]
    },
    {
        id: 3,
        score: 9,
        solution: { x: 30, y: 350 },
        holes: [
            { side: "bottom", start: 0, end: 600, color: "tomato", opensAt: 4 },
            { side: "top", start: 250, end: 350, color: null, opensAt: null }
        ]
    },
    {
        id: 4,
        score: 12,
        solution: { x: 30, y: 435 },
        holes: [
            { side: "top", start: 50, end: 200, color: null, opensAt: null },
            { side: "bottom", start: 500, end: 600, color: null, opensAt: null },
            { side: "left", start: 300, end: 400, color: null, opensAt: null },
            { side: "right", start: 200, end: 400, color: null, opensAt: null },

            { side: "left", start: 500, end: 600, color: "orange", opensAt: 8 },
            { side: "bottom", start: 0, end: 100, color: "orange", opensAt: 8 }
        ]
    },
    {
        id: 5,
        score: 15,
        solution: { x: 300, y: 30 },
        holes: [
            { side: "left", start: 0, end: 600, color: "orange", opensAt: 7 },
            { side: "right", start: 0, end: 600, color: "orange", opensAt: 7 },
            { side: "top", start: 100, end: 200, color: null, opensAt: null },
            { side: "bottom", start: 400, end: 500, color: null, opensAt: null }
        ]
    },
    {
        id: 6,
        score: 17,
        solution: { x: 560, y: 310 },
        holes: [
            { side: "top", start: 0, end: 150, color: null, opensAt: null },
            { side: "top", start: 450, end: 600, color: null, opensAt: null },
            { side: "bottom", start: 0, end: 150, color: null, opensAt: null },
            { side: "bottom", start: 450, end: 600, color: null, opensAt: null },
            { side: "top", start: 250, end: 350, color: "hotpink", opensAt: 8 },
            { side: "bottom", start: 250, end: 350, color: "hotpink", opensAt: 8 },
            { side: "left", start: 250, end: 350, color: "hotpink", opensAt: 8 },
            { side: "right", start: 250, end: 350, color: "hotpink", opensAt: 8 }
        ]
    },
    {
        id: 7,
        score: 19,
        solution: { x: 30, y: 40 },
        holes: [
            { side: "top", start: 0, end: 100, color: "dodgerblue", opensAt: 2 },
            { side: "left", start: 0, end: 100, color: "dodgerblue", opensAt: 2 },
            { side: "top", start: 300, end: 600, color: "crimson", opensAt: 9 },
            { side: "left", start: 300, end: 600, color: "crimson", opensAt: 9 },
            { side: "right", start: 250, end: 350, color: null, opensAt: null },
            { side: "bottom", start: 250, end: 350, color: null, opensAt: null }
        ]
    },
    {
        id: 8,
        score: 20,
        solution: { x: 425, y: 349 },
        holes: [

            { side: "top", start: 0, end: 200, color: "hotpink", opensAt: 8 },
            { side: "top", start: 400, end: 600, color: "hotpink", opensAt: 8 },
            { side: "bottom", start: 200, end: 400, color: "hotpink", opensAt: 8 },
            { side: "left", start: 200, end: 400, color: "gold", opensAt: 3 },
            { side: "right", start: 0, end: 200, color: "gold", opensAt: 3 },
            { side: "right", start: 400, end: 600, color: "gold", opensAt: 3 }
        ]
    },
    {
        id: 9,
        score: 23,
        solution: { x: 20, y: 395 },
        holes: [
            { side: "top", start: 0, end: 100, color: "gold", opensAt: 3 },
            { side: "top", start: 250, end: 350, color: "gold", opensAt: 3 },
            { side: "bottom", start: 250, end: 350, color: "gold", opensAt: 3 },
            { side: "bottom", start: 500, end: 600, color: "gold", opensAt: 3 },
            { side: "left", start: 250, end: 350, color: "gold", opensAt: 3 },
            { side: "left", start: 500, end: 600, color: "gold", opensAt: 3 },
            { side: "right", start: 0, end: 100, color: "gold", opensAt: 3 },
            { side: "right", start: 250, end: 350, color: "gold", opensAt: 3 }
        ]
    },
    {
        id: 10,
        score: 26,
        solution: { x: 25, y: 470 },
        holes: [
            { side: "top", start: 150, end: 250, color: "gold", opensAt: 3 },
            { side: "top", start: 350, end: 450, color: "gold", opensAt: 3 },
            { side: "bottom", start: 150, end: 250, color: "gold", opensAt: 3 },
            { side: "bottom", start: 350, end: 450, color: "gold", opensAt: 3 },
            { side: "left", start: 150, end: 250, color: "gold", opensAt: 3 },
            { side: "left", start: 350, end: 450, color: "gold", opensAt: 3 },
            { side: "right", start: 150, end: 250, color: "gold", opensAt: 3 },
            { side: "right", start: 350, end: 450, color: "gold", opensAt: 3 },

            { side: "top", start: 0, end: 50, color: "hotpink", opensAt: 8 },
            { side: "top", start: 550, end: 600, color: "hotpink", opensAt: 8 },
            { side: "bottom", start: 0, end: 50, color: "hotpink", opensAt: 8 },
            { side: "bottom", start: 550, end: 600, color: "hotpink", opensAt: 8 },
            { side: "left", start: 0, end: 50, color: "hotpink", opensAt: 8 },
            { side: "left", start: 550, end: 600, color: "hotpink", opensAt: 8 },
            { side: "right", start: 0, end: 50, color: "hotpink", opensAt: 8 },
            { side: "right", start: 550, end: 600, color: "hotpink", opensAt: 8 }
        ]
    }
];