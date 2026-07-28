import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { QrCode, Download, Printer } from "lucide-react";

export const QRCodeGenerator = () => {
  const { currentBranch } = useResto();
  const [tableCount, setTableCount] = useState(20);
  const [baseUrl, setBaseUrl] = useState("https://truffles.resto/menu");

  const tablesArray = Array.from({ length: tableCount }, (_, i) => `T${i + 1}`);

  const handlePrintQRs = () => {
    window.print();
  };

  return (
    <div className="qr-generator-container fade-in">
      <div className="qr-header truffles-card no-print">
        <div>
          <h2>Table QR Code Generator Tool</h2>
          <span className="caption-text">
            Generate printable QR code stickers for physical tables (T1 to T{tableCount})
          </span>
        </div>

        <button className="btn-primary" onClick={handlePrintQRs}>
          <Printer size={16} /> Print All QR Stickers
        </button>
      </div>

      <div className="qr-config-bar truffles-card no-print" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="caption-text">Base Menu URL:</label>
          <input type="text" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
        </div>

        <div className="form-group" style={{ width: "160px" }}>
          <label className="caption-text">Table Count:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={tableCount}
            onChange={(e) => setTableCount(parseInt(e.target.value) || 20)}
          />
        </div>
      </div>

      {/* QR Code Printable Grid */}
      <div className="qr-print-grid">
        {tablesArray.map((tbl) => {
          const targetUrl = `${baseUrl}?table=${tbl}&branch=${encodeURIComponent(currentBranch)}`;
          return (
            <div key={tbl} className="qr-sticker-card">
              <h2 className="brand-truffles-title" style={{ fontSize: "16px" }}>TRUFFLES</h2>
              <span className="caption-text">{currentBranch}</span>

              {/* Dynamic SVG QR representation */}
              <svg viewBox="0 0 100 100" className="qr-svg-sticker">
                <rect width="100" height="100" fill="#FFFFFF" rx="4" />
                <rect x="8" y="8" width="24" height="24" fill="#0A0A12" />
                <rect x="12" y="12" width="16" height="16" fill="#FFFFFF" />
                <rect x="16" y="16" width="8" height="8" fill="#FF6B35" />

                <rect x="68" y="8" width="24" height="24" fill="#0A0A12" />
                <rect x="72" y="12" width="16" height="16" fill="#FFFFFF" />
                <rect x="76" y="16" width="8" height="8" fill="#FF6B35" />

                <rect x="8" y="68" width="24" height="24" fill="#0A0A12" />
                <rect x="12" y="72" width="16" height="16" fill="#FFFFFF" />
                <rect x="16" y="76" width="8" height="8" fill="#FF6B35" />

                <rect x="40" y="40" width="20" height="20" fill="#FF6B35" />
              </svg>

              <div className="qr-table-tag">TABLE {tbl}</div>
              <span className="caption-text" style={{ fontSize: "10px" }}>
                Scan to Order Directly
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
