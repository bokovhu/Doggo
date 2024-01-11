const fs = require("fs");
const path = require("path");

// In this script, log format is:
// [action-kebab-case] Progress message [...]

// We are in packages/web/scripts/before-build.js

// Remove dist directory if it exists (also log removal)
// dist is in packages/web/dist
const distDir = path.join(__dirname, "..", "dist");

if (fs.existsSync(distDir)) {
    console.log("[remove-dist] Removing dist directory...");
    fs.rmdirSync(distDir, { recursive: true });
    console.log("[remove-dist] Removed dist directory.");
} else {
    console.log("[remove-dist] Dist directory does not exist.");
}

// Create dist directory (also log creation)

if (!fs.existsSync(distDir)) {
    console.log("[create-dist] Creating dist directory...");
    fs.mkdirSync(distDir, { recursive: true });
    console.log("[create-dist] Created dist directory.");
}


// Copy all files **recursively** from packages/web/public to packages/web/dist
// (also log copy)

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (exists && isDirectory) {
        console.log("[copy] Copying directory " + src + " to " + dest + "...");
        if(!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
        console.log("[copy] Copied directory " + src + " to " + dest + ".");
    } else {
        console.log("[copy] Copying file " + src + " to " + dest + "...");
        fs.copyFileSync(src, dest);
        console.log("[copy] Copied file " + src + " to " + dest + ".");
    }
}

const publicDir = path.join(__dirname, "..", "public");
console.log("[copy] Copying public directory " + publicDir + " to " + distDir + "...");
copyRecursiveSync(publicDir, distDir);
console.log("[copy] Copied public directory " + publicDir + " to " + distDir + ".");
