import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { Users, UserPlus, Shield, Trash2, CheckCircle, XCircle } from "lucide-react";

export const StaffManagement = () => {
  const { staffList, addStaff, toggleStaffActive, deleteStaff } = useResto();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Waiter");
  const [password, setPassword] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in staff name and phone.");
      return;
    }

    addStaff({ name, phone, role, password: password || "123456" });
    setName("");
    setPhone("");
    setPassword("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this staff account?")) {
      deleteStaff(id);
    }
  };

  return (
    <div className="staff-management-container fade-in">
      <div className="staff-header truffles-card">
        <div>
          <h2>Staff Account & Role Management</h2>
          <span className="caption-text">
            Configure restaurant team members, roles, and access controls
          </span>
        </div>
      </div>

      <div className="staff-two-panel">
        {/* Add Staff Form Panel */}
        <div className="staff-form-card truffles-card">
          <div className="card-title-row" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <UserPlus size={20} color="#FF6B35" />
            <h3>Add New Staff Member</h3>
          </div>

          <form onSubmit={handleAddSubmit} className="staff-form">
            <div className="form-group">
              <label className="caption-text">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="caption-text">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="caption-text">Role / Designation *</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Manager">Manager (Full Access)</option>
                <option value="Cashier">Cashier (Billing & Orders)</option>
                <option value="Kitchen">Kitchen (KDS Pass)</option>
                <option value="Waiter">Waiter (Floor Tables)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="caption-text">Access Pin / Password</label>
              <input
                type="password"
                placeholder="Default: 123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "12px" }}>
              <UserPlus size={16} /> Save Staff Member
            </button>
          </form>
        </div>

        {/* Staff Table Panel */}
        <div className="staff-table-card truffles-card">
          <h3>Active Team Members ({staffList.length})</h3>

          <table className="live-orders-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="staff-name-wrap">
                      <span className="price-mono" style={{ fontSize: "14px", color: "#FFFFFF" }}>
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="caption-text">{s.phone}</td>
                  <td>
                    <span className="badge-tag active">{s.role}</span>
                  </td>
                  <td>
                    <button
                      className={`badge-tag ${s.isActive ? "badge-ready" : ""}`}
                      onClick={() => toggleStaffActive(s.id)}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-action"
                      style={{ color: "#EF4444", borderColor: "#EF4444" }}
                      onClick={() => handleDelete(s.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
