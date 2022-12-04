import { readFileSync } from "fs";

const matches = readFileSync(__dirname + "/matches.txt", "utf-8")
    .split("\r\n")
    .map((match) => match.split(" "));

const options: Record<string, string[]> = {
    rock: ["A", "X"],
    paper: ["B", "Y"],
    scissors: ["C", "Z"],
};

const values: Record<string, number> = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const output = [0, 0];

const game = (moves: string[]) => {
    const [player1, player2] = moves;

    const keys = Object.keys(options);

    const output0 = keys.find((key) => options[key][0] === player1);
    const output1 = keys.find((key) => options[key][1] === player2);

    // Add the values of the moves to output of each player
    if (output0) output[0] += values[output0];
    if (output1) output[1] += values[output1];

    // If the values are equal, add 3 to each player
    if (output0 === output1) {
        output[0] += 3;
        output[1] += 3;

        return output;
    }

    switch (output0) {
        case "rock":
            if (output1 === "paper") output[1] += 6;

            if (output1 === "scissors") output[0] += 6;
            break;
        case "paper":
            if (output1 === "rock") output[0] += 6;

            if (output1 === "scissors") output[1] += 6;
            break;
        case "scissors":
            if (output1 === "rock") output[1] += 6;

            if (output1 === "paper") output[0] += 6;
            break;

        default:
            throw new Error("Invalid move");
    }

    return output;
};

matches.forEach((moves) => game(moves));

console.log(output);
