import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TranscriptList from "../components/Transcript";
import { useNavigate } from "react-router-dom";

interface ActionItem {
  task: string;
  owner: string | null;
  dueDate: string | null;
  summary: string;
}

interface Transcript {
  _id: string;
  rawTranscript: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [transcript, setTranscript] = useState("");
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [history, setHistory] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/transcript`, {
      headers: { Authorization: token || "" },
    });

    setHistory(response.data.transcripts);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleExtract = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;
    if (!transcript.trim()) {
      setError("Transcript cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/transcript`,
        { transcript },
        { headers: { Authorization: token } }
      );

      setActionItems(response.data.actionItems);
      setTranscript("");
      fetchHistory();
    } catch {
      setError("Extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Paste Transcript</h2>

          <textarea
            className="w-full border rounded p-3 h-40"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            onClick={handleExtract}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Extracting..." : "Extract"}
          </button>

          {actionItems.length > 0 && (
            <div className="mt-6 space-y-3">
              {actionItems.map((item, index) => (
                <div key={index} className="border p-3 rounded bg-gray-50">
                  <div className="font-medium">{item.task}</div>
                  <div className="text-sm text-gray-600">
                    Owner: {item.owner || "Not mentioned"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Recent Transcripts</h2>
          <TranscriptList transcripts={history} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
