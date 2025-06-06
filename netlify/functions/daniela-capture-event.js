// Přejmenovaná a upravená logovací funkce pro Danielu
exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    if (event.httpMethod === 'OPTIONS') { return { statusCode: 204, headers, body: '' }; }    
    if (event.httpMethod !== "POST") { return { statusCode: 405, headers, body: "Method Not Allowed" }; }
    try {
        const data = JSON.parse(event.body);
        const eventData = {
            session: data.session_id || "N/A", event_name: data.event || "unknown",
            page: data.pageURL || "N/A", client_ip: event.headers['x-nf-client-connection-ip'] || "N/A",
            user_agent: data.userAgent || "N/A", client_ts: data.timestamp_client || "N/A",
            server_ts: new Date().toISOString(),
            details: data.age_gate_response ? { age_gate: data.age_gate_response } : {}
        };
        console.log("DANIELA_EVENT_CAPTURED:", JSON.stringify(eventData, null, 2)); 
        return { statusCode: 200, headers, body: JSON.stringify({ status: "captured" }) };
    } catch (error) {
        return { statusCode: 400, headers, body: JSON.stringify({ status: "error", message: error.message }) };
    }
};
