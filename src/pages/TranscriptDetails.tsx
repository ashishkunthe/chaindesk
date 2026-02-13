import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ActionItemCard from "../components/ActionItem";

interface ActionItem {
  _id: string;
  task: string;
  owner: string | null;
  dueDate: string | null;
  status: "open" | "done";
  summary: string;
}

interface TranscriptResponse {
  transcript: {
    rawTranscript: string;
  };
  actionItems: ActionItem[];
}

const API_URL = import.meta.env.VITE_API_URL;

const TranscriptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [data, setData] = useState<TranscriptResponse | null>(null);

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const fetchTranscript = async () => {
    const response = await axios.get(`${API_URL}/transcript/${id}`, {
      headers: { Authorization: token || "" },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchTranscript();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded shadow">
          <div className="mb-6 bg-gray-50 p-4 rounded">
            {data.transcript.rawTranscript}
          </div>

          <div className="space-y-4">
            {data.actionItems.map((item) => (
              <ActionItemCard
                key={item._id}
                item={item}
                refresh={fetchTranscript}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptDetail;
