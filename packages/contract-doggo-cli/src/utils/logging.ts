import chalk from "chalk";

// Logging

export const LOG_OPTIONS: {
    plain: boolean;
    resultOnly: boolean;
    resultJson: boolean;
} = {
    plain: false,
    resultOnly: false,
    resultJson: false,
};

export function outSuccess(...args: any[]) {
    if(LOG_OPTIONS.resultOnly) {
        return;
    }
    if(LOG_OPTIONS.plain) {
        console.log(`${chalk.green('[success]')}`, ...args);
    } else {
        console.log(`${chalk.green('✅ SUCCESS')}`, ...args);
    }
}

export function outWarning(...args: any[]) {
    if(LOG_OPTIONS.resultOnly) {
        return;
    }
    if(LOG_OPTIONS.plain) {
        console.log(`${chalk.yellow('[warning]')}`, ...args);
    } else {
        console.log(`${chalk.yellow('⚠️ WARNING')}`, ...args);
    }
}

export function outError(...args: any[]) {
    if(LOG_OPTIONS.resultOnly) {
        return;
    }
    if(LOG_OPTIONS.plain) {
        console.log(`${chalk.red('[error]')}`, ...args);
    } else {
        console.log(`${chalk.red('❌ ERROR')}`, ...args);
    }
}

export function outInfo(...args: any[]) {
    if(LOG_OPTIONS.resultOnly) {
        return;
    }
    if(LOG_OPTIONS.plain) {
    } else {
        console.log(`${chalk.blue('ℹ️ INFO')}`, ...args);
    }
}

export function outResult(...args: any[]) {
    if(LOG_OPTIONS.resultJson) {
        console.log(JSON.stringify(args));
    } else if(LOG_OPTIONS.plain) {
        console.log(`${chalk.blue('[result]')}`, ...args);
    } else {
        console.log(`${chalk.blue('🔍 RESULT')}`, ...args);
    }
}