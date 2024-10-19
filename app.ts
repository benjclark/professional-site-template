import Handlebars, { TemplateDelegate } from 'npm:handlebars';

interface TemplateData {
    title: string;
    message: string;
}

export default {
    async fetch(request: Request): Promise<Response> {
        try {
            let templateName = 'index';
            let data: TemplateData = {
                title: 'Homepage',
                message: 'This is the Homepage',
            };

            const url = new URL(request.url);

            if (url.pathname.endsWith('/about')) {
                templateName = 'about';
                data = {
                    title: 'About',
                    message: 'This is the About page.',
                };
            }

            const templatePath = await Deno.realPath(`./src/pages/${templateName}.hbs`);
            const templateSource = await Deno.readTextFile(templatePath);
            const template: TemplateDelegate<TemplateData> = Handlebars.compile(templateSource);
            const html: string = template(data);

            return new Response(html, {
                status: 200,
                headers: { 'Content-Type': 'text/html' },
            });
        } catch (error) {
            console.error(error);
            return new Response('Internal Server Error', {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
            });
        }
    },
};
