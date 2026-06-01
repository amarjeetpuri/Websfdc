<?php
/**
 * Websfdc Technology — Booking API
 * Handles: Google Calendar event creation + Email to client
 *
 * SETUP:
 * 1. Replace YOUR_ANTHROPIC_API_KEY with your key from https://console.anthropic.com
 * 2. Upload to public_html alongside chat-widget.js
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

// ╔═══════════════════════════════════════╗
// ║   YOUR ANTHROPIC API KEY HERE         ║
// ╚═══════════════════════════════════════╝
$API_KEY      = 'YOUR_ANTHROPIC_API_KEY';
$MCP_URL      = 'https://calendarmcp.googleapis.com/mcp/v1';
$MEHAK_EMAIL  = 'info@websfdctech.co.in';
$MEET_LINK    = 'https://meet.google.com/cho-uopp-gco';
$TIMEZONE     = 'Asia/Kolkata';
$COMPANY      = 'Websfdc Technology Pvt Ltd';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { http_response_code(400); echo json_encode(['error'=>'Invalid JSON']); exit; }

$name    = trim($input['name']    ?? '');
$email   = trim($input['email']   ?? '');
$phone   = trim($input['phone']   ?? '');
$company = trim($input['company'] ?? '');
$service = trim($input['service'] ?? 'Salesforce Consultation');
$notes   = trim($input['notes']   ?? '');
$dateRaw = $input['dateRaw']      ?? date('Y-m-d');
$time    = $input['time']         ?? '10:00 AM';
$meetLink = $input['meetLink']    ?? $MEET_LINK;

if (!$email) { http_response_code(400); echo json_encode(['error'=>'Email required']); exit; }

// ── Parse times ───────────────────────────────────────────────────
preg_match('/(\d+):(\d+)\s*(AM|PM)/i', $time, $tm);
$hr = (int)($tm[1] ?? 10); $mn = (int)($tm[2] ?? 0); $ap = strtoupper($tm[3] ?? 'AM');
if ($ap==='PM' && $hr!==12) $hr += 12;
if ($ap==='AM' && $hr===12) $hr = 0;

$tz = new DateTimeZone($TIMEZONE);
$start = new DateTime($dateRaw, $tz); $start->setTime($hr, $mn, 0);
$end   = clone $start; $end->modify('+30 minutes');
$startISO = $start->format('Y-m-d\TH:i:s');
$endISO   = $end->format('Y-m-d\TH:i:s');
$displayDate = $start->format('l, F j, Y \a\t g:i A T');

// ── 1. Create Google Calendar Event via Anthropic MCP ─────────────
$calDesc = "<b>📋 Booking Details</b><br>
Name: {$name}<br>
Company: {$company}<br>
Phone: {$phone}<br>
Email: {$email}<br>
Service: {$service}<br>
" . ($notes ? "Notes: {$notes}<br>" : '') . "
<br><b>🎥 Join Meeting:</b> <a href='{$meetLink}'>{$meetLink}</a>";

$calPrompt = "Please create a Google Calendar event with these details:
- Summary: Websfdc Consultation: {$service} — {$name}
- Start: {$startISO}
- End: {$endISO}
- Timezone: {$TIMEZONE}
- Description: {$calDesc}
- Attendees: {$email}, {$MEHAK_EMAIL}
- Google Meet URL: {$meetLink}
- Notification level: ALL
- Color ID: 9
Confirm once created.";

$calPayload = [
  'model'      => 'claude-sonnet-4-20250514',
  'max_tokens' => 512,
  'mcp_servers'=> [['type'=>'url','url'=>$MCP_URL,'name'=>'gcal']],
  'messages'   => [['role'=>'user','content'=>$calPrompt]]
];

$calOk = false;
$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch,[
  CURLOPT_RETURNTRANSFER=>true, CURLOPT_POST=>true,
  CURLOPT_POSTFIELDS=>json_encode($calPayload),
  CURLOPT_HTTPHEADER=>['Content-Type: application/json','x-api-key: '.$API_KEY,'anthropic-version: 2023-06-01','anthropic-beta: mcp-client-2025-04-04'],
  CURLOPT_TIMEOUT=>30
]);
$calResp = curl_exec($ch); $calCode = curl_getinfo($ch,CURLINFO_HTTP_CODE); curl_close($ch);
if ($calCode===200) { $calOk = true; }

// ── 2. Send confirmation email to CLIENT ──────────────────────────
$clientSubject = "Your Consultation is Confirmed — Websfdc Technology";
$clientHtml = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;background:#f4f6fb;font-family:Inter,Arial,sans-serif;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f4f6fb;padding:32px 16px;'>
    <tr><td align='center'>
      <table width='560' cellpadding='0' cellspacing='0' style='background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);'>
        <!-- Header -->
        <tr><td style='background:linear-gradient(135deg,#03012e,#0055b3);padding:32px 36px;text-align:center;'>
          <div style='font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;'>Websfdc Tech</div>
          <div style='color:rgba(255,255,255,0.65);font-size:13px;margin-top:4px;'>Salesforce Implementation Partner</div>
        </td></tr>
        <!-- Confirm banner -->
        <tr><td style='background:#e8f4fd;padding:18px 36px;text-align:center;border-bottom:1px solid #dbeafe;'>
          <div style='font-size:36px;'>🎉</div>
          <div style='font-size:20px;font-weight:700;color:#0055b3;margin-top:6px;'>Consultation Confirmed!</div>
        </td></tr>
        <!-- Body -->
        <tr><td style='padding:32px 36px;'>
          <p style='font-size:15px;color:#334155;line-height:1.7;margin:0 0 24px;'>
            Hi <strong>{$name}</strong>,<br>
            Your <strong>{$service}</strong> consultation with <strong>Websfdc Technology</strong> has been successfully booked.
          </p>
          <!-- Details card -->
          <table width='100%' cellpadding='0' cellspacing='0' style='background:#f8faff;border-radius:14px;border:1.5px solid #dbeafe;overflow:hidden;margin-bottom:24px;'>
            <tr><td style='padding:14px 18px;border-bottom:1px solid #e2e8f0;'>
              <span style='font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.5px;'>📅 Date &amp; Time</span>
              <div style='font-size:15px;font-weight:700;color:#0055b3;margin-top:4px;'>{$displayDate}</div>
            </td></tr>
            <tr><td style='padding:14px 18px;border-bottom:1px solid #e2e8f0;'>
              <span style='font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.5px;'>⚙️ Service</span>
              <div style='font-size:15px;font-weight:600;color:#1e293b;margin-top:4px;'>{$service}</div>
            </td></tr>
            " . ($company ? "<tr><td style='padding:14px 18px;border-bottom:1px solid #e2e8f0;'>
              <span style='font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.5px;'>🏢 Company</span>
              <div style='font-size:15px;font-weight:600;color:#1e293b;margin-top:4px;'>{$company}</div>
            </td></tr>" : '') . "
            <tr><td style='padding:14px 18px;'>
              <span style='font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.5px;'>🎥 Google Meet</span>
              <div style='margin-top:6px;'>
                <a href='{$meetLink}' style='display:inline-block;background:linear-gradient(135deg,#0055b3,#0095d4);color:#fff;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;'>Join Meeting →</a>
              </div>
            </td></tr>
          </table>
          " . ($calOk ? "<table width='100%' cellpadding='0' cellspacing='0' style='background:#dcfce7;border-radius:12px;margin-bottom:24px;'>
            <tr><td style='padding:12px 16px;font-size:13.5px;color:#15803d;font-weight:600;'>
              ✅ A Google Calendar invite has also been sent to your email.
            </td></tr>
          </table>" : '') . "
          <p style='font-size:14px;color:#64748b;line-height:1.7;margin:0 0 6px;'>Have questions before the call?</p>
          <p style='font-size:14px;color:#64748b;margin:0;'>
            📱 <a href='tel:+917015548507' style='color:#0055b3;font-weight:600;'>+91 70155 48507</a> &nbsp;|&nbsp;
            ✉️ <a href='mailto:info@websfdctech.co.in' style='color:#0055b3;font-weight:600;'>info@websfdctech.co.in</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style='background:#f8faff;padding:20px 36px;text-align:center;border-top:1px solid #e2e8f0;'>
          <div style='font-size:12px;color:#94a3b8;'>
            © 2025 Websfdc Technology Pvt Ltd &nbsp;·&nbsp;
            <a href='https://websfdc.in' style='color:#0055b3;text-decoration:none;'>websfdc.in</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";

// ── 3. Send notification email to MEHAK ───────────────────────────
$mehakSubject = "New Booking: {$service} — {$name}";
$mehakHtml = "
<html><body style='font-family:Arial,sans-serif;background:#f4f6fb;padding:24px;'>
  <div style='background:#fff;border-radius:16px;padding:28px;max-width:520px;margin:0 auto;border:1.5px solid #e2e8f0;'>
    <h2 style='color:#0055b3;margin:0 0 16px;'>📅 New Consultation Booking</h2>
    <table style='width:100%;border-collapse:collapse;'>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;width:110px;'>👤 Name</td><td style='padding:8px 0;font-weight:600;color:#1e293b;'>{$name}</td></tr>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>✉️ Email</td><td style='padding:8px 0;font-weight:600;color:#1e293b;'>{$email}</td></tr>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>📱 Phone</td><td style='padding:8px 0;font-weight:600;color:#1e293b;'>{$phone}</td></tr>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>🏢 Company</td><td style='padding:8px 0;font-weight:600;color:#1e293b;'>{$company}</td></tr>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>⚙️ Service</td><td style='padding:8px 0;font-weight:600;color:#0055b3;'>{$service}</td></tr>
      <tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>📅 Date/Time</td><td style='padding:8px 0;font-weight:600;color:#1e293b;'>{$displayDate}</td></tr>
      " . ($notes ? "<tr><td style='padding:8px 0;color:#64748b;font-size:13px;'>📝 Notes</td><td style='padding:8px 0;color:#1e293b;'>{$notes}</td></tr>" : '') . "
    </table>
    <div style='margin-top:20px;padding:14px;background:#e8f4fd;border-radius:12px;'>
      <a href='{$meetLink}' style='color:#0055b3;font-weight:700;font-size:14px;text-decoration:none;'>🎥 Join Google Meet →</a>
    </div>
  </div>
</body></html>";

// Send emails using PHP mail()
$headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nFrom: Websfdc Technology <{$MEHAK_EMAIL}>\r\nReply-To: {$MEHAK_EMAIL}";

$clientSent = mail($email, $clientSubject, $clientHtml, $headers);
$mehakSent  = mail($MEHAK_EMAIL, $mehakSubject, $mehakHtml, $headers);

echo json_encode([
  'success'      => true,
  'calendarCreated' => $calOk,
  'clientEmailSent' => $clientSent,
  'mehakEmailSent'  => $mehakSent,
  'meetLink'     => $meetLink,
  'message'      => 'Booking confirmed!'
]);
