import { GameCardGenerator } from "./generator";
import { PlayerCommand } from "./model";

export function parsePlayerCommand(commandString: string): PlayerCommand {
    const cardGenerator = new GameCardGenerator();
    const idInt = parseInt(commandString);
    if (isNaN(idInt)) {
        throw new Error(`Invalid id: ${commandString}`);
    }
    if (idInt < 0) {
        throw new Error(`Id must be positive or 0: ${commandString}`);
    }
    return {
        card: cardGenerator.generateCard(idInt)
    };
}

export function parsePlayerCommandList(commandListString: string): Array<PlayerCommand> {
    // Format: COMMAND1,COMMAND2,COMMAND3,...
    // Example: 1,2,3
    // ID = 32-bit unsigned integer
    return commandListString.split(",").map(parsePlayerCommand);
}
