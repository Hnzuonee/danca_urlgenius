// Přepsaná funkce pro získání cílové URL
exports.handler = async function(event, context) {
    const targetUrl = "https://onlyfans.com/tvaginger";

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: corsHeaders, body: '' };
    }
    
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ redirectUrl: targetUrl }),
        };
    } else {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: "GET method is required" }),
        };
    }
};
