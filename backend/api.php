<?php
// api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function getBrasilApiData($endpoint) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://brasilapi.com.br/api/$endpoint");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$requestUri = $_SERVER['REQUEST_URI']; // Ex: /brasil-api-client-react/backend/banks/v1
$basePath = '/brasil-api-client-react/backend/';

// Remove o prefixo do caminho$endpoint = $_GET['endpoint'] ?? '';
$endpoint = str_replace($basePath, '', $requestUri);


$data = getBrasilApiData($endpoint);

echo json_encode([
    'status' => 200,
    'success' => true,
    'data' => $data
]);