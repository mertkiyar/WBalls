export const LEVELS = [
    {
        id: 1,
        score: 4,
        holes: [
            { side: "top", start: 200, end: 400, color: null, opensAt: null }
        ]
    },
    {
        id: 2,
        score: 7,
        holes: [
            { side: "left", start: 300, end: 500, color: null, opensAt: null },
            { side: "bottom", start: 300, end: 500, color: null, opensAt: null },
            { side: "right", start: 0, end: 100, color: null, opensAt: null }
        ]
    },
    {
        id: 3,
        score: 9,
        holes: [
            { side: "bottom", start: 0, end: 600, color: "tomato", opensAt: 4 },
            { side: "top", start: 250, end: 350, color: null, opensAt: null }
        ]
    },
    {
        id: 4,
        score: 12,
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