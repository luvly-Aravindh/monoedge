<?php
// ============================================================
// MonoEdge lead endpoint v4
// v4 change: the optin form (source = "optin", sends only name
// and email) is logged but does NOT send an email. Only the
// booking submission (full details) emails you. One visitor
// walking the funnel now produces exactly one email.
// Every submission, optin included, is still written to the
// lead log and visible at the export URL.
// ============================================================

// ---------------- Config ----------------
$to          = "sriethiraj@getnos.io";
$from        = "hello@getnos.io";
$subject     = "Monoedge - New eBook Lead";
$logFile     = __DIR__ . "/getnos_leads_8f3k1.jsonl";   // protected by .htaccess
$exportToken = "gx7Kq2mN9pR4tW8vZ3bY6cF1hJ5sL0dA";

// Sources that are logged but never emailed.
$noEmailSources = ["optin"];

// ---------------- Admin: view captured leads ----------------
// https://getnos.io/monoedge/submit.php?export=TOKEN  -> full lead log
// https://getnos.io/monoedge/submit.php?ping=1        -> health check
if (isset($_GET['ping'])) {
    header("Content-Type: application/json");
    echo json_encode(["ok" => true, "version" => 4, "log_exists" => file_exists($logFile)]);
    exit;
}
if (isset($_GET['export'])) {
    if (hash_equals($exportToken, (string)$_GET['export'])) {
        header("Content-Type: text/plain; charset=UTF-8");
        echo file_exists($logFile) ? file_get_contents($logFile) : "No leads logged yet.";
    } else {
        http_response_code(403);
        echo "Forbidden";
    }
    exit;
}

header("Content-Type: application/json");

// ---------------- Read input (JSON or form POST) ----------------
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";
if (strpos($contentType, "application/json") !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
} else {
    $input = $_POST;
}
if (!is_array($input)) { $input = []; }

// ---------------- Fields ----------------
$name       = trim($input['name']        ?? '');
$email      = trim($input['email']       ?? '');
$phone      = trim($input['phone']       ?? '');
$company    = trim($input['company']     ?? '');
$whatsapp   = trim($input['whatsapp']    ?? '');
$leadMagnet = trim($input['lead_magnet'] ?? '');   // logged only
$source     = trim($input['source']      ?? '');   // logged only
$clientTs   = trim($input['ts']          ?? '');   // logged only
$page       = trim($input['page']        ?? '');   // logged only

// ---------------- Validation ----------------
if ($name === '' || $email === '') {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name and Email are required."]);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address."]);
    exit;
}

// ---------------- Helpers ----------------
function esc($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
function safe_header($v) { return trim(str_replace(["\r", "\n"], ' ', (string)$v)); }
function row($label, $value, $alt = false) {
    if (trim((string)$value) === '') { return ''; }
    $bg = $alt ? " style='background:#f7f7f7;'" : "";
    return "<tr{$bg}><td width='180'><strong>" . esc($label) . "</strong></td><td>" . esc($value) . "</td></tr>";
}

$ip     = safe_header($_SERVER['REMOTE_ADDR'] ?? '');
$leadId = uniqid('L', true);
date_default_timezone_set('Asia/Kolkata');
$serverTs = date('Y-m-d H:i:s') . ' IST';

// ---------------- STEP 1: log the lead to disk FIRST ----------------
$leadRecord = [
    "type"        => "lead",
    "id"          => $leadId,
    "server_ts"   => $serverTs,
    "name"        => $name,
    "email"       => $email,
    "phone"       => $phone,
    "company"     => $company,
    "whatsapp"    => $whatsapp,
    "lead_magnet" => $leadMagnet,
    "source"      => $source,
    "page"        => $page,
    "client_ts"   => $clientTs,
    "ip"          => $ip,
];
$logged = @file_put_contents(
    $logFile,
    json_encode($leadRecord, JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

// ---------------- STEP 2: respond immediately, release the browser ----------------
ignore_user_abort(true);
set_time_limit(30);
if (function_exists('apache_setenv')) { @apache_setenv('no-gzip', '1'); }
@ini_set('zlib.output_compression', '0');

ob_start();
echo json_encode([
    "success" => true,
    "message" => "Lead submitted successfully.",
    "id"      => $leadId,
    "logged"  => (bool)$logged,
]);
$size = ob_get_length();
header("Content-Length: {$size}");
header("Connection: close");
ob_end_flush();
@ob_flush();
flush();
if (function_exists('fastcgi_finish_request')) { fastcgi_finish_request(); }

// ---------------- STEP 3: email only for booking submissions ----------------
if (in_array($source, $noEmailSources, true)) {
    @file_put_contents(
        $logFile,
        json_encode(["type" => "mail_status", "id" => $leadId, "mailed" => false, "reason" => "optin_no_email", "ts" => date('Y-m-d H:i:s') . ' IST'], JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
    exit;
}

$headers   = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: GetNos <{$from}>";
$headers[] = "Reply-To: " . safe_header($email);
$headers[] = "X-Mailer: PHP/" . phpversion();

$rows  = row('Name', $name);
$rows .= row('Email', $email, true);
$rows .= row('Phone', $phone);
$rows .= row('Company', $company, true);
$rows .= row('WhatsApp', $whatsapp);

$body = "
<html>
<head><title>New eBook Lead</title></head>
<body style='font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;'>
<table width='650' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:8px;margin:auto;border:1px solid #ddd;'>
<tr>
    <td style='background:#111827;color:#ffffff;padding:20px;text-align:center;font-size:24px;font-weight:bold;'>
        New eBook Lead
    </td>
</tr>
<tr>
<td style='padding:30px;'>
<table width='100%' cellpadding='10' cellspacing='0' style='border-collapse:collapse;'>
{$rows}
</table>
</td>
</tr>
<tr>
<td style='background:#111827;color:#ffffff;padding:15px;text-align:center;font-size:13px;'>
Monoedge Website Lead Notification
</td>
</tr>
</table>
</body>
</html>
";

// Single send, no retry, no envelope flag.
$mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));

// ---------------- STEP 4: record the mail result next to the lead ----------------
@file_put_contents(
    $logFile,
    json_encode(["type" => "mail_status", "id" => $leadId, "mailed" => (bool)$mailSent, "ts" => date('Y-m-d H:i:s') . ' IST'], JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);
?>