import { readFileSync } from "fs";

const file = readFileSync(__dirname + "/calories.txt", { encoding: "utf-8" });

const lines = file.split("\r\n");

const totals: number[] = [];
let state = 0;

lines.forEach((line, index) => {
    console.log(line);

    if (line === "") {
        console.log("is empty line");

        totals.push(state);
        state = 0;
        return;
    }

    state += parseInt(line);
});

if (state > 0) {
    totals.push(state);
}

totals.sort((a, b) => b - a);

totals.splice(3, totals.length - 3);
console.log(totals);

const result = totals.reduce((a, b) => a + b);
console.log(result);
