export default {
    async fetch(request) {
        if (request.url.endsWith("/json")) {
            return Response.json({ hello: "world" });
        }

        return new Response(`Hello world! Request is ${request.url}`);
    },
};
