<?php
// MonoEdge funnel - lead capture endpoint
// Receives JSON { name, email, phone, company, source, lead_magnet, ts }
// Stores to data/leads.ndjson. Replace the storage block with your CRM / Google Sheet / DB.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$phone   = trim($data['phone'] ?? '');
$company = trim($data['company'] ?? '');
$source  = trim($data['source'] ?? '');
$magnet  = trim($data['lead_magnet'] ?? '');

if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Invalid name or email']);
  exit;
}

$row = [
  'ts'          => date('c'),
  'name'        => $name,
  'email'       => $email,
  'phone'       => $phone,
  'company'     => $company,
  'source'      => $source,
  'lead_magnet' => $magnet,
  'ip'          => $_SERVER['REMOTE_ADDR'] ?? '',
];

// --- storage (replace with your CRM / Google Sheet / DB) ---
$dir = __DIR__ . '/data';
if (!is_dir($dir)) { @mkdir($dir, 0775, true); }
@file_put_contents($dir . '/leads.ndjson', json_encode($row) . "\n", FILE_APPEND | LOCK_EX);

// --- optional: forward to a CRM / webhook ---
// $ch = curl_init('https://your-crm.example/webhook');
// curl_setopt_array($ch, [CURLOPT_POST=>1, CURLOPT_RETURNTRANSFER=>1,
//   CURLOPT_HTTPHEADER=>['Content-Type: application/json'], CURLOPT_POSTFIELDS=>json_encode($row)]);
// curl_exec($ch); curl_close($ch);

echo json_encode(['ok' => true]);
