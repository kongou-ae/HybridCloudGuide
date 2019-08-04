// node.js, "classic" way:
const MarkdownIt = require('markdown-it');

const execSync = require('child_process').execSync;
const path = require("path")
const fs = require('fs');
const md = new MarkdownIt()
        .use(require('markdown-it-anchor'), {
            slugify: function (header) {
                return encodeURI(header.trim()
                    .toLowerCase()
                    .replace(/[\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~]/g, '')
                    .replace(/\s+/g, '-')) // Replace spaces with hyphens
                    .replace(/\-+$/, ''); // Replace trailing hyphen
            }
        });

const main = async ()=>{

    try {
        await fs.unlinkSync("dist/guidline.pdf")
    } catch(err) {
        console.log("dist/guidline.pdf is not found ")
    }

    let mdBook = await fs.readFileSync("README.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("002_ハイブリッドクラウド概論.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("003_スタイルマップ.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("004_ハイブリッドクラウドスタイル選択の考慮点.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("005_ハイブリッドクラウドスタイル.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("006_ハイブリッドクラウドユースケース.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("007_用語集.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("008_ハイブリッドクラウド研究会の活動への参加の誘い.md", {encoding: "utf-8"});
    mdBook += await fs.readFileSync("009_あとがき的なもの.md", {encoding: "utf-8"});

    let htmlBook = md.render(mdBook);

    htmlBook = htmlBook.replace(/<a href="[0-9]{3}_.*?#/g,'<a href="#')
    htmlBook = await fs.readFileSync("build/header.html", {encoding: "utf-8"}) + htmlBook;
    htmlBook += await fs.readFileSync("build/footer.html", {encoding: "utf-8"});

    await fs.writeFileSync("build/book.html",htmlBook,{ flag : 'w' })
    console.log("Generated build/book.html")
}

main()