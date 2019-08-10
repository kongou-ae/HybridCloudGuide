// node.js, "classic" way:
const MarkdownIt = require('markdown-it');

const path = require("path")
const fs = require('fs');
const md = new MarkdownIt()
        .use(require('markdown-it-anchor'), {
            slugify: function (header) {
                return encodeURI(header.trim()
                    .replace(/[\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~]/g, '')
                    .replace(/\s+/g, '-')) // Replace spaces with hyphens
                    .replace(/\-+$/, ''); // Replace trailing hyphen
            }
        });

const main = async ()=>{
    try {
        await fs.unlinkSync("dist/guideline.pdf")
    } catch(err) {
        console.log("dist/guideline.pdf is not found ")
    }

    // すべての Markdown を結合する
    let mdBook = await fs.readFileSync("README.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("002_ハイブリッドクラウド概論.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("003_スタイルマップ.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("004_ハイブリッドクラウドスタイル選択の考慮点.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("005_ハイブリッドクラウドスタイル.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("006_ハイブリッドクラウドユースケース.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("007_用語集.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("008_ハイブリッドクラウド研究会の活動への参加の誘い.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("009_あとがき的なもの.md", {encoding: "utf-8"});

    // Media フォルダを build フォルダにコピー
    let files = fs.readdirSync('media');
    files.forEach(element => {
        console.log(element)
        fs.copyFileSync("media/" + element, "build/media/" + element)
    });

    // Markdown を HTML に変換
    let htmlBook = md.render(mdBook);
    htmlBook = htmlBook.replace(/<a href="[0-9]{3}_.*?#/g,'<a href="#')
    htmlBook = await fs.readFileSync("build/header.html", {encoding: "utf-8"}) + htmlBook;
    htmlBook += await fs.readFileSync("build/footer.html", {encoding: "utf-8"});

    await fs.writeFileSync("build/book.html",htmlBook,{ flag : 'w' })
    console.log("Generated build/book.html")    
}

main()