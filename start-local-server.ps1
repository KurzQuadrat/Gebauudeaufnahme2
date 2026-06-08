# ============================================================
#  Lokaler Testserver — Gebäudeerfassung (Kurz Quadrat)
#  Vanilla HTML/CSS/JS, kein Framework, kein npm, kein Build.
#
#  Starten:
#    Rechtsklick → "Mit PowerShell ausführen"
#    ODER über start-local-server.bat (Doppelklick)
#
#  Stoppen: Fenster schliessen oder Strg+C
# ============================================================

$port     = 8000
$rootPath = $PSScriptRoot          # Ordner dieser Skriptdatei
$localIP  = "192.168.68.111"       # Lokale WLAN-IP (ggf. anpassen per ipconfig)

# MIME-Typen für alle in der App vorkommenden Dateitypen
$mimeTypes = @{
  ".html"  = "text/html; charset=utf-8"
  ".css"   = "text/css; charset=utf-8"
  ".js"    = "application/javascript; charset=utf-8"
  ".json"  = "application/json; charset=utf-8"
  ".png"   = "image/png"
  ".jpg"   = "image/jpeg"
  ".jpeg"  = "image/jpeg"
  ".gif"   = "image/gif"
  ".svg"   = "image/svg+xml"
  ".ico"   = "image/x-icon"
  ".ttf"   = "font/ttf"
  ".woff"  = "font/woff"
  ".woff2" = "font/woff2"
  ".webp"  = "image/webp"
  ".txt"   = "text/plain; charset=utf-8"
}

# Listener konfigurieren
$listener = New-Object System.Net.HttpListener

# Zuerst versuchen: alle Interfaces (fuer iPhone-Zugriff)
# Falls fehlschlaegt (fehlende Rechte): Fallback auf localhost
$allInterfaces = $true
try {
  $listener.Prefixes.Add("http://+:$port/")
  $listener.Start()
} catch {
  $allInterfaces = $false
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add("http://localhost:$port/")
  $listener.Start()
}

Clear-Host
Write-Host "============================================================" -ForegroundColor DarkRed
Write-Host "  Gebäudeerfassung — Lokaler Testserver" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor DarkRed
Write-Host ""
Write-Host "  PC (Browser):   " -NoNewline; Write-Host "http://localhost:$port" -ForegroundColor Cyan
if ($allInterfaces) {
  Write-Host "  iPhone (WLAN):  " -NoNewline; Write-Host "http://${localIP}:$port" -ForegroundColor Green
  Write-Host ""
  Write-Host "  iPhone: PC und iPhone muessen im gleichen WLAN sein." -ForegroundColor Yellow
  Write-Host "  Falls iPhone keinen Zugriff hat: Windows-Firewall pruefen" -ForegroundColor Yellow
  Write-Host "  (Port $port eingehend freigeben)." -ForegroundColor Yellow
} else {
  Write-Host "  iPhone (WLAN):  " -NoNewline
  Write-Host "Nur localhost verfuegbar." -ForegroundColor Red
  Write-Host "  Fuer iPhone-Zugriff: Als Administrator ausfuehren oder" -ForegroundColor Yellow
  Write-Host "  netsh http add urlacl url=http://+:$port/ user=Everyone" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "  Projektordner:  $rootPath" -ForegroundColor Gray
Write-Host "  Zum Beenden:    Dieses Fenster schliessen oder Strg+C" -ForegroundColor Gray
Write-Host ""
Write-Host "  Warte auf Anfragen..." -ForegroundColor DarkGray
Write-Host "============================================================" -ForegroundColor DarkRed

# Request-Schleife
while ($listener.IsListening) {
  try {
    $context  = $listener.GetContext()
    $request  = $context.Request
    $response = $context.Response

    # URL-Pfad ermitteln
    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }

    # Datei im Projektordner suchen
    $relPath  = $urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $filePath = Join-Path $rootPath $relPath

    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $ext   = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime  = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }

      $response.StatusCode     = 200
      $response.ContentType    = $mime
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)

      Write-Host "  200  $urlPath" -ForegroundColor DarkGray
    } else {
      $response.StatusCode = 404
      $msg   = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
      $response.ContentType    = "text/plain; charset=utf-8"
      $response.ContentLength64 = $msg.Length
      $response.OutputStream.Write($msg, 0, $msg.Length)

      Write-Host "  404  $urlPath" -ForegroundColor Red
    }

    $response.Close()

  } catch [System.Net.HttpListenerException] {
    # Listener wurde gestoppt (Strg+C oder Fenster geschlossen)
    break
  } catch {
    # Einzelne Anfrage fehlgeschlagen — weiterlaufen
    try { $response.StatusCode = 500; $response.Close() } catch {}
    Write-Host "  ERR  $_" -ForegroundColor Red
  }
}

$listener.Stop()
Write-Host "Server gestoppt." -ForegroundColor Gray
