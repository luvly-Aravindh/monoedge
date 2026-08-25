<?php

// ============================================================
// MonoEdge lead endpoint v5 — forwards to Getnos Desk
// Each field is sent as its own JSON key (never a message blob).
// Desk emails the team + optional Google Sheet row.
// ============================================================

// ---------------- CORS ----------------
$allowed_origins = [
    'https://get.monoedge.in',
    'https://getnos.io',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    if (in_array($origin, $allowed_origins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---------------- Config ----------------
$deskApiKey   = 'lh_o6gzoWoji2jEkRU-hVMiBXkbLKbf0WyVHKeHL6OrG3k';
$deskEndpoint = 'https://deskbackend.getnos.io/v1/lead';
$logFile      = __DIR__ . '/getnos_leads_8f3k1.jsonl';
$exportToken  = 'gx7Kq2mN9pR4tW8vZ3bY6cF1hJ5sL0dA';

// ---------------- Admin ----------------
if (isset($_GET['ping'])) {
    header('Content-Type: application/json');
    echo json_encode(['ok' => true, 'version' => 5, 'log_exists' => file_exists($logFile)]);
    exit;
}

if (isset($_GET['export'])) {
    if (hash_equals($exportToken, (string)$_GET['export'])) {
        header('Content-Type: text/plain; charset=UTF-8');
        echo file_exists($logFile) ? file_get_contents($logFile) : 'No leads logged yet.';
    } else {
        http_response_code(403);
        echo 'Forbidden';
    }
    exit;
}

header('Content-Type: application/json');

// ---------------- Read input ----------------
$contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';
if (strpos($contentType, 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true);
} else {
    $input = $_POST;
}
if (!is_array($input)) {
    $input = [];
}

if (!is_array($input)) { $input = []; }

// Honeypot filled = bot; accept silently, do not forward.
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Lead submitted successfully.', 'id' => uniqid('H', true)]);
    exit;
}

// Map legacy source → Desk form id
if ($form === '') {
    if ($source === 'optin') {
        $form = 'optin';
    } elseif ($source === 'landing-booking') {
        $form = 'contact';
    } else {
        $form = 'contact';
    }
}

// ---------------- Validation ----------------
if ($name === '' || $email === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and Email are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// ---------------- Helpers ----------------
function safe_header($v) {
    return trim(str_replace(["\r", "\n"], ' ', (string)$v));
}

function send_to_desk($endpoint, $apiKey, array $payload) {
    if (!function_exists('curl_init')) {
        return ['ok' => false, 'error' => 'curl_unavailable'];
    }

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 8,
    ]);

    $body = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);

    if ($body === false) {
        return ['ok' => false, 'error' => $err ?: 'curl_failed'];
    }

    $json = json_decode($body, true);
    if (!is_array($json)) {
        return ['ok' => false, 'error' => 'invalid_json', 'http' => $code, 'raw' => $body];
    }

    $duplicate = !empty($json['duplicate']);
    $success   = ($json['status'] ?? '') === 'success' || $duplicate;

    return [
        'ok'        => $success && ($code >= 200 && $code < 300),
        'duplicate' => $duplicate,
        'leadId'    => $json['leadId'] ?? null,
        'message'   => $json['message'] ?? null,
        'http'      => $code,
    ];
}

$ip     = safe_header($_SERVER['REMOTE_ADDR'] ?? '');
$leadId = uniqid('L', true);
date_default_timezone_set('Asia/Kolkata');
$serverTs = date('Y-m-d H:i:s') . ' IST';

if ($clientTs === '') {
    $clientTs = date('c');
}

// ---------------- Desk payload (flat fields only) ----------------
$deskPayload = [
    'form'         => $form,
    'name'         => $name,
    'email'        => $email,
    'honeypot'     => '',
    'submittedAt'  => $clientTs,
    'landingPage'  => $page,
];

if ($phone !== '') {
    $deskPayload['phone'] = $phone;
}
if ($company !== '') {
    $deskPayload['company'] = $company;
}

// ---------------- Log locally ----------------
$leadRecord = [
    'type'        => 'lead',
    'id'          => $leadId,
    'server_ts'   => $serverTs,
    'form'        => $form,
    'name'        => $name,
    'email'       => $email,
    'phone'       => $phone,
    'company'     => $company,
    'lead_magnet' => $leadMagnet,
    'source'      => $source,
    'page'        => $page,
    'client_ts'   => $clientTs,
    'ip'          => $ip,
];

@file_put_contents(
    $logFile,
    json_encode($leadRecord, JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

// ---------------- Forward to Getnos Desk (once) ----------------
$desk = send_to_desk($deskEndpoint, $deskApiKey, $deskPayload);

@file_put_contents(
    $logFile,
    json_encode([
        'type'      => 'desk_status',
        'id'        => $leadId,
        'ok'        => $desk['ok'],
        'duplicate' => $desk['duplicate'] ?? false,
        'deskId'    => $desk['leadId'] ?? null,
        'ts'        => $serverTs,
    ], JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

// Treat Desk duplicate as success — never ask the client to retry.
if ($desk['ok']) {
    echo json_encode([
        'success'   => true,
        'duplicate' => !empty($desk['duplicate']),
        'message'   => $desk['message'] ?? 'Lead submitted successfully.',
        'leadId'    => $desk['leadId'] ?? $leadId,
        'id'        => $leadId,
        'desk'      => true,
    ]);
    exit;
}

// Desk failed but lead is logged — still return success so the funnel continues.
echo json_encode([
    'success' => true,
    'message' => 'Lead logged locally; Desk sync pending.',
    'leadId'  => $leadId,
    'id'      => $leadId,
    'desk'    => false,
    'desk_error' => $desk['error'] ?? 'unknown',
]);
