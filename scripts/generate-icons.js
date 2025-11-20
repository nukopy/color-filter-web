const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../icons/icon.svg');
const iconsDir = path.join(__dirname, '../icons');

// 生成するアイコンのサイズ
const sizes = [16, 48, 128];

async function generateIcons() {
  console.log('🎨 アイコン生成を開始します...\n');

  // SVGファイルが存在するか確認
  if (!fs.existsSync(svgPath)) {
    console.error('❌ SVGファイルが見つかりません:', svgPath);
    process.exit(1);
  }

  // SVGファイルを読み込み
  const svgBuffer = fs.readFileSync(svgPath);

  // 各サイズのPNGを生成
  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon${size}.png`);

    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✅ icon${size}.png を生成しました`);
    } catch (error) {
      console.error(`❌ icon${size}.png の生成に失敗しました:`, error.message);
    }
  }

  console.log('\n🎉 すべてのアイコンの生成が完了しました！');
}

generateIcons().catch(error => {
  console.error('❌ エラーが発生しました:', error);
  process.exit(1);
});
