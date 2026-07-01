<?php
header("Content-Type: application/json");

// ==========================================
// Email Configuration
// ==========================================
$to      = "sriethiraj@getnos.io";
$from    = "hello@getnos.io";
$subject = "Monoedge - New eBook Lead";

// ==========================================
// Get Form Data (Supports JSON & POST)
// ==========================================
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";
if (strpos($contentType, "application/json") !== false) {
    $input = json_decode(file_get_contents("php://input"), true);
} else {
    $input = $_POST;
}
if (!is_array($input)) { $input = []; }

// ==========================================
// Fetch Fields  (Message removed)
// ==========================================
$name     = trim($input['name']     ?? '');
$email    = trim($input['email']    ?? '');
$phone    = trim($input['phone']    ?? '');
$company  = trim($input['company']  ?? '');
$whatsapp = trim($input['whatsapp'] ?? '');

// ==========================================
// Validation
// ==========================================
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

// ==========================================
// Helpers
// ==========================================
function esc($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
function safe_header($v) { return trim(str_replace(["\r", "\n"], ' ', (string)$v)); }
// A row is rendered only when it has a value, so empty fields never show blank rows.
function row($label, $value, $alt = false) {
    if (trim((string)$value) === '') { return ''; }
    $bg = $alt ? " style='background:#f7f7f7;'" : "";
    return "<tr{$bg}><td width='180'><strong>" . esc($label) . "</strong></td><td>" . esc($value) . "</td></tr>";
}

$ip = safe_header($_SERVER['REMOTE_ADDR'] ?? '');

// ==========================================
// Email Headers
// ==========================================
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: GetNos <{$from}>";
$headers[] = "Reply-To: " . safe_header($email);
$headers[] = "X-Mailer: PHP/" . phpversion();

// ==========================================
// Email Body  (Message row removed)
// ==========================================
$rows  = row('Name', $name);
$rows .= row('Email', $email, true);
$rows .= row('Phone', $phone);
$rows .= row('Company', $company, true);
$rows .= row('WhatsApp', $whatsapp);
$rows .= row('Submitted On', date("d M Y h:i A"), true);
$rows .= row('IP Address', $ip);

$body = "
<html>
<head>
    <title>New eBook Lead</title>
</head>
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
GetNos Website Lead Notification
</td>
</tr>

</table>

</body>
</html>
";

// ==========================================
// Send Email  (envelope sender first, fallback without)
// ==========================================
$mailSent = @mail($to, $subject, $body, implode("\r\n", $headers), "-f {$from}");
if (!$mailSent) {
    $mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));
}

// ==========================================
// Response
// ==========================================
if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Lead submitted successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Unable to send email."]);
}
?>
