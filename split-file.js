const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'ffmpeg-core.wasm'); // 确保 ffmpeg-core.wasm 文件在此脚本旁边
const outputDir = path.join(__dirname, 'dist-parts');
const numberOfParts = 5;

if (!fs.existsSync(sourceFilePath)) {
    console.error(`错误：源文件未找到，请将 ffmpeg-core.wasm 放在项目根目录。`);
    process.exit(1);
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const fileBuffer = fs.readFileSync(sourceFilePath);
const totalSize = fileBuffer.length;
const partSize = Math.ceil(totalSize / numberOfParts);

console.log(`文件总大小: ${totalSize} 字节`);
console.log(`每块大小: ${partSize} 字节`);
console.log(`正在分割成 ${numberOfParts} 份...`);

for (let i = 0; i < numberOfParts; i++) {
    const start = i * partSize;
    const end = Math.min(start + partSize, totalSize);

    const partBuffer = fileBuffer.slice(start, end);
    const outputPartPath = path.join(outputDir, `ffmpeg-core.wasm.part.${i + 1}`);
    fs.writeFileSync(outputPartPath, partBuffer);
    console.log(`已生成: ${outputPartPath} (${partBuffer.length} 字节)`);
}

console.log('\n分割完成！请将 `dist-parts` 目录下的所有文件上传到你的 GitHub 仓库。');