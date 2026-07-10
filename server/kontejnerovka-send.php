<?php
declare(strict_types=1);

/*
 * PHP endpoint for Kontejnerovka.cz inquiry forms.
 *
 * Use only on PHP-capable hosting. GitHub Pages cannot execute this file.
 * When moving away from Web3Forms, upload this file as /send.php and change
 * the form action from https://api.web3forms.com/submit to /send.php.
 */

const RECIPIENT_EMAIL = 'info@kontejnerovka.cz';
const SITE_EMAIL = 'no-reply@kontejnerovka.cz';
const PHONE_DISPLAY = '728 505 028';
const PHONE_HREF = '+420728505028';
const MAX_ATTACHMENT_SIZE = 8388608; // 8 MB
const RATE_LIMIT_WINDOW = 900; // 15 minutes
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

function clean(string $key, int $max = 700): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        return '';
    }

    $value = trim((string) $value);
    $value = preg_replace('/[^\P{C}\t\n\r]+/u', '', $value) ?? '';

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }

    return substr($value, 0, $max);
}

function encode_subject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function request_id(DateTimeImmutable $date): string
{
    return 'KON-' . $date->format('Ymd-His') . '-' . strtoupper(bin2hex(random_bytes(2)));
}

function rate_limit_exceeded(): bool
{
    $identity = ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
    $dir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'kontejnerovka-rate';

    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false;
    }

    $path = $dir . DIRECTORY_SEPARATOR . hash('sha256', $identity) . '.json';
    $handle = @fopen($path, 'c+');
    if (!$handle) {
        return false;
    }

    $limited = false;
    $now = time();

    if (@flock($handle, LOCK_EX)) {
        $contents = stream_get_contents($handle) ?: '[]';
        $timestamps = json_decode($contents, true);
        if (!is_array($timestamps)) {
            $timestamps = [];
        }

        $timestamps = array_values(array_filter($timestamps, static function ($timestamp) use ($now): bool {
            return is_int($timestamp) && $timestamp > $now - RATE_LIMIT_WINDOW;
        }));

        $limited = count($timestamps) >= RATE_LIMIT_MAX_SUBMISSIONS;
        if (!$limited) {
            $timestamps[] = $now;
        }

        rewind($handle);
        ftruncate($handle, 0);
        $payload = json_encode($timestamps);
        if ($payload !== false) {
            fwrite($handle, $payload);
        }
        fflush($handle);
        flock($handle, LOCK_UN);
    }

    fclose($handle);

    return $limited;
}

function render_page(bool $success, string $message): void
{
    $title = $success ? 'Poptávka byla odeslána' : 'Poptávku se nepodařilo odeslat';
    $statusClass = $success ? 'status-ok' : 'status-error';

    http_response_code($success ? 200 : 422);
    header('Content-Type: text/html; charset=UTF-8');

    echo '<!doctype html><html lang="cs"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<meta name="robots" content="noindex,nofollow">';
    echo '<title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . ' | Kontejnerovka.cz</title>';
    echo '<link rel="stylesheet" href="/styles.css">';
    echo '<style>main.response-page{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:#0d100f;padding:28px}.response-box{width:min(640px,100%);background:#f5f1e9;border:1px solid rgba(255,106,31,.22);border-radius:10px;padding:32px;box-shadow:0 22px 70px rgba(0,0,0,.28)}.response-kicker{display:inline-flex;margin-bottom:16px;color:#ff6a1f;font-size:13px;font-weight:900;text-transform:uppercase}.response-box h1{margin:0 0 12px;color:#111;font-size:clamp(30px,5vw,46px);line-height:1.02}.response-box p{color:#343434;font-size:17px;line-height:1.55}.response-next{margin:20px 0;padding:15px 16px;border-left:4px solid #ff6a1f;background:#fff}.response-next strong{display:block;margin-bottom:6px;color:#111}.response-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.response-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 18px;border-radius:8px;font-weight:900;text-decoration:none}.response-actions a:first-child{background:#ff6a1f;color:#111}.response-actions a:last-child{background:#151a17;color:#fff}.status-error{border-top:6px solid #b00020}.status-ok{border-top:6px solid #ff6a1f}@media(max-width:640px){main.response-page{align-items:flex-start;padding:18px}.response-box{padding:22px}.response-actions{display:grid;grid-template-columns:1fr;gap:8px}}</style>';
    echo '</head><body><main class="response-page"><section class="response-box ' . $statusClass . '">';
    echo '<span class="response-kicker">Kontejnerovka.cz</span>';
    echo '<h1>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1>';
    echo '<p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
    if ($success) {
        echo '<div class="response-next"><strong>Co bude dál</strong><p>Projdu údaje k zakázce a ozvu se telefonicky nebo e-mailem. Pokud bude chybět typ odpadu, množství, fotka nebo přesná obec, doplníme to společně.</p></div>';
    }
    echo '<div class="response-actions">';
    echo '<a href="/#kontakt">Zpět na poptávku</a>';
    echo '<a href="tel:' . htmlspecialchars(PHONE_HREF, ENT_QUOTES, 'UTF-8') . '">Zavolat ' . htmlspecialchars(PHONE_DISPLAY, ENT_QUOTES, 'UTF-8') . '</a>';
    echo '</div></section></main></body></html>';
    exit;
}

function redirect_success(string $requestId): void
{
    header('Location: /dekujeme.html?id=' . rawurlencode($requestId), true, 303);
    exit;
}

function section(string $title, array $fields, string $emptyText = 'Nevyplněno'): string
{
    $lines = [$title, str_repeat('-', strlen($title))];
    $hasValue = false;

    foreach ($fields as $label => $value) {
        $value = trim((string) $value);
        if ($value === '') {
            continue;
        }
        $hasValue = true;
        $lines[] = $label . ': ' . $value;
    }

    if (!$hasValue) {
        $lines[] = $emptyText;
    }

    return implode("\n", $lines);
}

function attachment_payload(): ?array
{
    if (!isset($_FILES['attachment']) || !is_array($_FILES['attachment'])) {
        return null;
    }

    $file = $_FILES['attachment'];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK || (int) ($file['size'] ?? 0) > MAX_ATTACHMENT_SIZE) {
        render_page(false, 'Příloha musí být obrázek nebo PDF do 8 MB. Poptávku můžete poslat bez přílohy a fotku doplnit později.');
    }

    $originalName = basename((string) ($file['name'] ?? 'priloha'));
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'pdf'];

    if (!in_array($extension, $allowedExtensions, true)) {
        render_page(false, 'Příloha musí být JPG, PNG, WEBP, HEIC nebo PDF do 8 MB.');
    }

    $tmpName = (string) ($file['tmp_name'] ?? '');
    if ($tmpName === '' || !is_uploaded_file($tmpName)) {
        render_page(false, 'Přílohu se nepodařilo bezpečně načíst. Zkuste formulář odeslat bez přílohy.');
    }

    $mime = function_exists('mime_content_type') ? (mime_content_type($tmpName) ?: 'application/octet-stream') : 'application/octet-stream';
    $contents = file_get_contents($tmpName);
    if ($contents === false) {
        render_page(false, 'Přílohu se nepodařilo načíst. Zkuste formulář odeslat bez přílohy.');
    }

    return [
        'name' => $originalName,
        'mime' => $mime,
        'contents' => $contents,
    ];
}

function send_mail(string $subject, string $body, string $replyTo = '', ?array $attachment = null): bool
{
    $headers = [
        'From: Kontejnerovka.cz <' . SITE_EMAIL . '>',
        'MIME-Version: 1.0',
        'X-Mailer: PHP/' . phpversion(),
    ];

    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    if ($attachment === null) {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        return mail(RECIPIENT_EMAIL, encode_subject($subject), $body, implode("\r\n", $headers));
    }

    $boundary = 'kontejnerovka-' . bin2hex(random_bytes(12));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $message = '--' . $boundary . "\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $body . "\r\n\r\n";
    $message .= '--' . $boundary . "\r\n";
    $message .= 'Content-Type: ' . $attachment['mime'] . '; name="' . addslashes($attachment['name']) . '"' . "\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= 'Content-Disposition: attachment; filename="' . addslashes($attachment['name']) . '"' . "\r\n\r\n";
    $message .= chunk_split(base64_encode($attachment['contents'])) . "\r\n";
    $message .= '--' . $boundary . "--\r\n";

    return mail(RECIPIENT_EMAIL, encode_subject($subject), $message, implode("\r\n", $headers));
}

function send_confirmation(string $email, string $name, string $requestId): void
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return;
    }

    $body = "Dobrý den" . ($name !== '' ? ' ' . $name : '') . ",\n\n";
    $body .= "děkujeme za poptávku. Máme ji pod číslem " . $requestId . ".\n";
    $body .= "Projdu údaje k zakázce a ozvu se telefonicky nebo e-mailem. Přesná cena se potvrzuje podle adresy, druhu odpadu nebo materiálu, množství, přístupu a termínu.\n\n";
    $body .= "Pokud věc spěchá, zavolejte rovnou na " . PHONE_DISPLAY . ".\n\n";
    $body .= "Kontejnerovka.cz\n";
    $body .= "Matyáš Mašín, IČO 01379178, DIČ CZ9211070033, plátce DPH\n";

    $headers = [
        'From: Kontejnerovka.cz <' . SITE_EMAIL . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];

    mail($email, encode_subject('Poptávku jsme přijali - Kontejnerovka.cz (' . $requestId . ')'), $body, implode("\r\n", $headers));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    render_page(false, 'Formulář otevřete z webu Kontejnerovka.cz. Pokud chcete rychlou cenu, zavolejte na ' . PHONE_DISPLAY . '.');
}

if (clean('botcheck') !== '' || clean('website') !== '') {
    redirect_success('');
}

if (rate_limit_exceeded()) {
    render_page(false, 'Formulář byl z této sítě odeslán vícekrát za sebou. Zkuste to prosím za chvíli, případně zavolejte rovnou na ' . PHONE_DISPLAY . '.');
}

$submittedAt = new DateTimeImmutable('now', new DateTimeZone('Europe/Prague'));
$submittedAtDisplay = $submittedAt->format('d.m.Y H:i') . ' Europe/Prague';
$requestId = request_id($submittedAt);

$name = clean('name', 140);
$phone = clean('phone', 90);
$email = clean('email', 180);
$location = clean('location', 220);
$service = clean('service', 220);
$message = clean('message', 4000);
$consent = isset($_POST['souhlas']);

if ($name === '' || $phone === '' || $location === '' || $service === '' || $message === '' || !$consent) {
    render_page(false, 'Chybí povinné údaje. Vyplňte prosím jméno, telefon, obec, službu, popis zakázky a souhlas se zpracováním.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    render_page(false, 'E-mail není ve správném tvaru. Můžete ho opravit, nebo pole nechat prázdné a poslat jen telefon.');
}

$bodyParts = [
    section('Poptávka', [
        'Číslo poptávky' => $requestId,
        'Odesláno' => $submittedAtDisplay,
        'Zdroj' => clean('page_url', 260) ?: ($_SERVER['HTTP_REFERER'] ?? ''),
    ]),
    section('Kontakt', [
        'Jméno' => $name,
        'Telefon' => $phone,
        'E-mail' => $email,
    ]),
    section('Zakázka', [
        'Obec / adresa' => $location,
        'Služba / materiál' => $service,
        'Typ odpadu' => clean('waste_type', 220),
        'Množství' => clean('amount', 220),
        'Velikost kontejneru' => clean('container_size', 220),
        'Přístup' => clean('access', 220),
        'Stání' => clean('standing', 220),
        'Termín' => clean('date', 220),
        'Urgence' => clean('urgency', 220),
        'Poznámka k fotce' => clean('photo', 500),
    ]),
    section('Zpráva zákazníka', [
        'Popis' => $message,
    ]),
];

$attachment = attachment_payload();
if ($attachment !== null) {
    $bodyParts[] = section('Příloha', [
        'Soubor' => $attachment['name'],
        'Typ' => $attachment['mime'],
    ]);
}

$mailBody = implode("\n\n", $bodyParts) . "\n\n--\nKontejnerovka.cz\n";
$subject = 'Poptávka z webu Kontejnerovka.cz - ' . $service . ' - ' . $location . ' (' . $requestId . ')';

if (!send_mail($subject, $mailBody, $email, $attachment)) {
    render_page(false, 'Poptávku se nepodařilo odeslat. Zavolejte prosím na ' . PHONE_DISPLAY . ' nebo napište na ' . RECIPIENT_EMAIL . '.');
}

send_confirmation($email, $name, $requestId);
redirect_success($requestId);
