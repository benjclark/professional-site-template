import { renderSync } from "npm:sass";

async function compileAllScss() {
    for await (const entry of Deno.readDir("./src/styles")) {
        if (entry.isFile && entry.name.endsWith(".scss")) {
            const scssPath = `.src/styles/${entry.name}`;
            const cssPath = `.public/styles/${entry.name.replace(".scss", ".css")}`;

            const result = renderSync({ file: scssPath });

            await Deno.writeFile(cssPath, result.css);
            console.log(`Compiled ${scssPath} to ${cssPath}`);
        }
    }
}

await compileAllScss();
