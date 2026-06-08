# Lokales Testen — Gebäudeerfassung

Änderungen können lokal getestet werden, ohne vorher zu pushen.
Die App ist reines Vanilla HTML/CSS/JS — ein einfacher Datei-Server genügt.

## Schnellstart (Doppelklick)

**`start-local-server.bat`** im Projektordner per Doppelklick starten.

Das Skript öffnet ein PowerShell-Fenster und startet automatisch einen
lokalen HTTP-Server auf Port 8000.

**Zum Stoppen:** Fenster schliessen.

---

## Test-Links

| Gerät | Link |
|---|---|
| **PC** (Browser) | `http://localhost:8000` |
| **iPhone** (gleiches WLAN) | `http://192.168.68.111:8000` |

> **iPhone-Voraussetzung:** PC und iPhone müssen im selben WLAN sein.
> Die lokale IP kann sich bei einem anderen Netzwerk ändern —
> dann in `start-local-server.ps1` den Wert bei `$localIP` anpassen
> (aktuelle IP per `ipconfig` im Terminal ermitteln).

---

## Technischer Hintergrund

Weder Python noch Node.js sind auf dem System installiert.
Der Testserver läuft daher über PowerShells eingebautes `System.Net.HttpListener`.
Das .bat-Skript ruft `start-local-server.ps1` mit `-ExecutionPolicy Bypass` auf,
sodass keine PowerShell-Signaturfreigabe nötig ist.

### iPhone-Zugriff — mögliche Probleme

**Windows-Firewall blockiert Port 8000:**
Das Skript bindet auf `http://+:8000/` (alle Interfaces).
Beim ersten Start fragt Windows ggf. nach einer Firewallfreigabe — „Zugriff erlauben".
Falls das iPhone keinen Zugriff bekommt, folgenden Befehl als Administrator ausführen:

```
netsh advfirewall firewall add rule name="Lokaler Testserver Port 8000" protocol=TCP dir=in localport=8000 action=allow
```

**Rechte reichen nicht (Skript startet nur auf localhost):**
Als Administrator ausführen (Rechtsklick auf `start-local-server.bat` → „Als Administrator ausführen").

---

## Kein Push nötig zum lokalen Testen

Der lokale Server liest die Dateien direkt aus dem Projektordner.
Jede gespeicherte Dateiänderung (CSS, JS, HTML) ist nach einem
einfachen **Browser-Reload** (F5 / Cmd+R) sofort sichtbar —
ohne Commit, ohne Push, ohne Build.

Push erst wenn der lokale Test erfolgreich war.

---

## Unterschied lokal ↔ GitHub Pages / Online

| Eigenschaft | Lokal (`localhost`) | GitHub Pages / Online |
|---|---|---|
| Sofort sichtbar nach Änderung | ✅ Ja (nach Reload) | ❌ Nein (erst nach Push + Deploy) |
| Push nötig | ❌ Nein | ✅ Ja |
| Erreichbar vom iPhone | ✅ Im gleichen WLAN | ✅ Überall |
| Echte Kundendaten sicher | ✅ Nur lokal | Abhängig von Konfiguration |
| LocalStorage | Eigener Browser-Speicher | Eigener Browser-Speicher |

---

## Lokale IP ermitteln / aktualisieren

Falls du in einem anderen Netzwerk bist:

```
ipconfig
```

IPv4-Adresse des WLAN-Adapters ablesen und in `start-local-server.ps1`
bei der Zeile `$localIP = "..."` eintragen.

---

## Alternative: Browser direkt öffnen (ohne Server)

Für reine Anzeige ohne Netzwerkzugriff kann `index.html` auch per
Doppelklick im Browser geöffnet werden (`file://…`).

**Einschränkung:** LocalStorage funktioniert, aber einige Browser
blockieren das Laden lokaler Ressourcen (CSS, JS) bei `file://`-Protokoll.
Der Testserver über `localhost` ist daher zuverlässiger.
