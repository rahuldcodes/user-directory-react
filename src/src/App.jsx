import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State variables for managing data, loading, and errors
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user directory. Network Error! ❌");
      setLoading(false);
    }
  };

  // Run fetchUsers once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // UI Styling Object for clean layout
  const styles = {
    container: { padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" },
    header: { color: "#2c3e50", marginBottom: "10px" },
    subHeader: { color: "#7f8c8d", marginBottom: "30px" },
    btn: { backgroundColor: "#3498db", color: "white", border: "none", padding: "12px 24px", fontSize: "16px", borderRadius: "5px", cursor: "pointer", transition: "0.3s", fontWeight: "bold", marginBottom: "40px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" },
    card: { backgroundColor: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "left", borderTop: "5px solid #3498db" },
    name: { fontSize: "20px", color: "#2c3e50", margin: "0 0 10px 0" },
    info: { fontSize: "14px", color: "#555", margin: "6px 0" },
    statusMessage: { fontSize: "18px", color: "#e74c3c", marginTop: "50px", fontWeight: "bold" }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>👤 User Directory</h1>
      <p style={styles.subHeader}>Real-time employee records fetched via REST API</p>
      
      {/* Requirement: Refresh Button */}
      <button style={styles.btn} onClick={fetchUsers}>🔄 Refresh Directory</button>

      {/* Requirement: Loading State */}
      {loading && <p style={styles.statusMessage}>⏳ Loading user records, please wait...</p>}

      {/* Requirement: Error State */}
      {error && <p style={styles.statusMessage}>{error}</p>}

      {/* Requirement: Display Dynamic Data if no loading/error */}
      {!loading && !error && (
        <div style={styles.grid}>
          {users.map((user) => (
            <div key={user.id} style={styles.card}>
              <h3 style={styles.name}>{user.name}</h3>
              {/* Displaying 4 fields per user (Requirement was at least 3) */}
              <p style={styles.info}><strong>📧 Email:</strong> {user.email}</p>
              <p style={styles.info}><strong>📞 Phone:</strong> {user.phone}</p>
              <p style={styles.info}><strong>🌐 Website:</strong> {user.website}</p>
              <p style={styles.info}><strong>🏢 Company:</strong> {user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
