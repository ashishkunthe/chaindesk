import { useEffect, useState } from "react";
import axios from "axios";

interface StatusResponse {
  backend: string;
  database: string;
  llm: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const Status = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/status`);
        setStatus(response.data);
      } catch (err) {
        setError("Failed to fetch status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const getColor = (value: string) =>
    value === "ok" ? "text-green-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>

        {loading && <p>Checking system...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {status && (
          <div className="space-y-3">
            <div>
              Backend:{" "}
              <span className={getColor(status.backend)}>{status.backend}</span>
            </div>
            <div>
              Database:{" "}
              <span className={getColor(status.database)}>
                {status.database}
              </span>
            </div>
            <div>
              LLM: <span className={getColor(status.llm)}>{status.llm}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
