const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/assets/poppr');

function checkAndFixColor(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    // Check if this object looks like a color property
    // Lottie colors are typically inside a shape property 'c' (color) or 's' (stroke)
    // which has a property 'k' that is the array of [r, g, b, a]

    // We want to be careful. 'k' is used for many things (keyframes).
    // Usually, a color property in Lottie looks like: { "a": 0, "k": [R, G, B, 1], "ix": ... }
    // The values R, G, B are 0-1.

    // However, blindly setting 'k' to [1,1,1,1] might break keyframes if 'k' is an array of keyframes.
    // If 'a' (animated) is 1, 'k' is an array of objects. 
    // If 'a' is 0, 'k' is the value array.

    // So we look for objects that specifically keys like "c" (color) or "s" (stroke) in the parent context? 
    // Easier: traverse, and if we see an object that has property "c" (color) or "s" (stroke) which is an object...

    // Let's traverse.
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            // If this is a fill ('fl') or stroke ('st') shape
            if ((obj.ty === 'fl' || obj.ty === 'st') && (key === 'c')) {
                const colorProp = obj[key];
                if (colorProp.a === 0 && Array.isArray(colorProp.k) && colorProp.k.length >= 3) {
                    // Static color: Set to White
                    // Preserve alpha if it's the 4th element, or just force 1
                    colorProp.k = [1, 1, 1, 1];
                } else if (colorProp.a === 1 && Array.isArray(colorProp.k)) {
                    // Animated color: 'k' is array of keyframes. 
                    // Each keyframe has 's' (start value) and 'e' (end value) which are color arrays
                    colorProp.k.forEach(kf => {
                        if (kf.s && Array.isArray(kf.s)) kf.s = [1, 1, 1, 1];
                        if (kf.e && Array.isArray(kf.e)) kf.e = [1, 1, 1, 1];
                    });
                }
            }
            // Also handling strokes 's' property is tricky because 's' is also scale.
            // Strokes are usually 'st' type shapes. The color is in 'c'. 
            // Stroke width is 'w'.
            // So relying on ty==='st' && key==='c' covers stroke color. 
            // Relying on ty==='fl' && key==='c' covers fill color.

            // Recursively process children
            checkAndFixColor(obj[key]);
        }
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
                let json = JSON.parse(raw);

                checkAndFixColor(json);

                fs.writeFileSync(filePath, JSON.stringify(json));
                console.log(`Modernized ${file} (Whited-out)`);
            } catch (e) {
                console.error(`Error processing ${file}`, e);
            }
        }
    });
});
