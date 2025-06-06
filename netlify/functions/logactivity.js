// Přepsaná funkce pro záznam aktivity
exports.handler = async function(event, context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: corsHeaders, body: '' };
    }    
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body);
        const activityData = {
            visitor_session: payload.session_key || "N/A",
            activity_type: payload.activity || "unknown",
            source_url: payload.source_page || "N/A",
            remote_ip: event.headers['x-nf-client-connection-ip'] || "N/A",
            client_agent: payload.clientAgent || "N/A",
            client_timestamp: payload.client_timestamp || "N/A",
            server_timestamp: new Date().toISOString(),
            metadata: payload.verification_response ? { verification: payload.verification_response } : {}
        };
        
        console.log("ACTIVITY_LOGGED:", JSON.stringify(activityData, null, 2)); 
        
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ result: "logged" }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ result: "error", details: error.message }),
        };
    }
};
