// Funkce pro Danielu s novou cílovou URL
exports.handler = async function(event, context) {
    // ZDE JE NOVÁ FINÁLNÍ DESTINACE
    const destinationLink = "https://onlyfans.com/justdaniela";

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ target: destinationLink }),
        };
    } else {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "GET method is required" }),
        };
    }
};
