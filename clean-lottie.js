const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/assets/poppr');

function cleanLottie(obj) {
    if (Array.isArray(obj)) {
        // Filter out layers that are type 5 (Text)
        // Also recursively clean items
        return obj
            .filter(item => !(item && item.ty === 5))
            .map(cleanLottie);
    } else if (typeof obj === 'object' && obj !== null) {
        // Remove 'chars' and 'fonts' properties if they exist at root or anywhere
        const newObj = {};
        for (const key in obj) {
            if (key === 'chars' || key === 'fonts') continue;
            newObj[key] = cleanLottie(obj[key]);
        }

        // Specific check if this object is a layer and has type 5 (double check)
        if (newObj.ty === 5) return null;

        return newObj;
    }
    return obj;
}

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Could not list directory", err);
        process.exit(1);
    }

    files.forEach(file => {
        if (file.startsWith('lottie-') && file.endsWith('.json')) {
            const filePath = path.join(dir, file);
            try {
                const raw = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(raw);
                const cleaned = cleanLottie(json);

                // Remove nulls from arrays that might have been introduced by cleaner returning null for objects
                // A second pass to ensure structure is valid JSON for Lottie (which expects objects/arrays)
                const finalString = JSON.stringify(cleaned, (key, value) => {
                    // Recursively filter nulls from arrays in the JSON.stringify replacer if needed, 
                    // but our map above handled structure. 
                    // However, if cleanLottie returned null for an object in an array (via map), 
                    // that array now has nulls. We should filter them.
                    if (Array.isArray(value)) return value.filter(x => x !== null);
                    return value;
                });

                fs.writeFileSync(filePath, finalString);
                console.log(`Cleaned ${file}`);
            } catch (e) {
                console.error(`Error processing ${file}`, e);
            }
        }
    });
});
