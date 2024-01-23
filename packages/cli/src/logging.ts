import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

export type LogKind = {
    tag: "system" | "out" | "error" | "prompt" | "success";
    symbols: {
        normal: string;
        error: string;
    }
}

export const LOG_KINDS: Record<LogKind["tag"], LogKind> = {
    system: {
        tag: "system",
        symbols: {
            normal: "⚙️",
            error: "❌"
        }
    },
    out: {
        tag: "out",
        symbols: {
            normal: "👍",
            error: "👎"
        }
    },
    error: {
        tag: "error",
        symbols: {
            normal: "❌",
            error: "❌"
        }
    },
    prompt: {
        tag: "prompt",
        symbols: {
            normal: "❓",
            error: "❌"
        }
    },
    success: {
        tag: "success",
        symbols: {
            normal: "✅",
            error: "❌"
        }
    }
}

export var DOGGO_LOG_SETTINGS = {
    plainLog: false
};

export var DOGGO_LOG_STATE = {
    outIsError: false,
    systemIsError: false,
    promptIsError: false,
}

export function doggoLog(
    kind: LogKind["tag"],
    ...args: any[]
): void {
    let logPrefix = LOG_KINDS[kind].symbols.normal;
    if (DOGGO_LOG_SETTINGS.plainLog) {
        logPrefix = `[${LOG_KINDS[kind].tag}]`;
    }
    console.log(`${logPrefix} ${args[0]}`, ...args.slice(1));
}

export function doggoLogErr(
    kind: LogKind["tag"],
    ...args: any[]
): void {
    let logPrefix = LOG_KINDS[kind].symbols.error;
    if (DOGGO_LOG_SETTINGS.plainLog) {
        logPrefix = `[ERR ${LOG_KINDS[kind].tag}]`;
    }
    console.error(`${logPrefix} ${args[0]}`, ...args.slice(1));
}

export function logSystem(...args: any[]) {
    if (DOGGO_LOG_STATE.systemIsError) {
        doggoLogErr("system", ...args);
    } else {
        doggoLog("system", ...args);
    }
}

export function logOut(...args: any[]) {
    if (DOGGO_LOG_STATE.outIsError) {
        doggoLogErr("out", ...args);
    } else {
        doggoLog("out", ...args);
    }
}

export function logError(...args: any[]) {
    doggoLogErr("error", ...args);
}

export function logPrompt(...args: any[]) {
    if (DOGGO_LOG_STATE.promptIsError) {
        doggoLogErr("prompt", ...args);
    } else {
        doggoLog("prompt", ...args);
    }
}

export function logSuccess(...args: any[]) {
    doggoLog("success", ...args);
}

export function outMd(md: string): void {
    marked.setOptions({
        renderer: new TerminalRenderer()
    })
    const rendered = marked(md.trim());
    logOut(rendered);
}
