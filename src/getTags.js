// scripts/extract-tags.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../docs');
const tagsSet = new Set();

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const fm = matter(content);
            if (fm.data.tags) {
                fm.data.tags.forEach(tag => tagsSet.add(tag));
            }
        }
    }
}

walkDir(docsDir);
const tagsArray = Array.from(tagsSet).sort();

fs.writeFileSync(
    path.join(__dirname, '../src/data/tags.json'),
    JSON.stringify(tagsArray, null, 2)
);

console.log(`✅ Tags extracted: ${tagsArray.length}`);
