import React from "react";
import { Cpu, Wifi, Code, Check } from "lucide-react";

export const ESP32FirmwareView = () => {
  const firmwareCode = `#include <WiFi.h>
#include <DNSServer.h>
#include <WebServer.h>

const char* ssid = "Truffles-Free-WiFi";
const byte DNS_PORT = 53;
IPAddress apIP(192, 168, 4, 1);

DNSServer dnsServer;
WebServer webServer(80);

const char* portalHTML = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Truffles Captive Portal</title>
  <style>
    body { background: #0A0A12; color: #FFFFFF; font-family: sans-serif; text-align: center; padding: 40px 20px; }
    .card { background: #11111F; border: 1px solid #222233; border-radius: 12px; padding: 24px; max-width: 360px; margin: 0 auto; }
    h1 { color: #FF6B35; font-size: 24px; margin-bottom: 4px; }
    .btn { background: #FF6B35; color: #0A0A12; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>TRUFFLES</h1>
    <p>Connected to Truffles-Free-WiFi</p>
    <p>Scan or select your table to start ordering!</p>
    <a href="http://192.168.4.1/start" class="btn">Open Truffles Menu</a>
  </div>
</body>
</html>
)rawliteral";

void handleRoot() {
  webServer.send(200, "text/html", portalHTML);
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(ssid);

  dnsServer.start(DNS_PORT, "*", apIP);
  webServer.on("/", handleRoot);
  webServer.onNotFound(handleRoot);
  webServer.begin();

  Serial.println("ESP32 Truffles Captive Portal Active!");
}

void loop() {
  dnsServer.processNextRequest();
  webServer.handleClient();
}`;

  return (
    <div className="esp32-firmware-container fade-in">
      <div className="esp32-header truffles-card">
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Cpu size={32} color="#FF6B35" />
          <div>
            <h2>ESP32-S3 WiFi Captive Portal Firmware</h2>
            <span className="caption-text">
              Standalone hardware firmware creating "Truffles-Free-WiFi" AP & DNS Hijack Server
            </span>
          </div>
        </div>
      </div>

      <div className="firmware-code-card truffles-card">
        <div className="code-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span className="price-mono" style={{ fontSize: "14px", color: "#FF6B35" }}>
            truffles_captive_portal.ino (Arduino C++)
          </span>
          <button
            className="btn-ghost"
            onClick={() => {
              navigator.clipboard.writeText(firmwareCode);
              alert("ESP32 C++ Firmware copied to clipboard!");
            }}
          >
            <Code size={16} /> Copy C++ Firmware Code
          </button>
        </div>

        <pre className="code-block-mono">
          <code>{firmwareCode}</code>
        </pre>
      </div>
    </div>
  );
};
