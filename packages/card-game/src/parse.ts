import { GameCardGenerator } from "./generator";
import { PlayerCommand } from "./model";

export function parsePlayerCommand(commandString: string): PlayerCommand {
    const cardGenerator = new GameCardGenerator();
    // Format: COLUMN=ID | ID
    // Example: A=412
    // Example: E=123
    // Example: 413
    // COLUMN = A | B | C | D | E | F
    // ID = 32-bit unsigned integer
    const [columnOrId, optionalId] = commandString.split("=") as [string, string];
    const column = optionalId === undefined ? undefined : columnOrId;
    const id = optionalId === undefined ? columnOrId : optionalId;
    const idInt = parseInt(id);
    if (isNaN(idInt)) {
        throw new Error(`Invalid id: ${id}`);
    }
    if (idInt < 0) {
        throw new Error(`Id must be positive or 0: ${id}`);
    }
    if (column === undefined) {
        return {
            card: cardGenerator.generateCard(idInt)
        };
    } else {
        if (["A", "B", "C", "D", "E", "F"].indexOf(column) === -1) {
            throw new Error(`Invalid column: ${column}`);
        }
        return {
            card: cardGenerator.generateCard(idInt),
            column: column as "A" | "B" | "C" | "D" | "E" | "F"
        };
    }
}

export function parsePlayerCommandList(commandListString: string): Array<PlayerCommand> {
    // Format: COMMAND1,COMMAND2,COMMAND3,...
    // Example: A=412,B=123,C=0
    // COMMAND = COLUMN=ID
    // COLUMN = A | B | C | D | E | F
    // ID = 32-bit unsigned integer
    return commandListString.split(",").map(parsePlayerCommand);
}
