import { useNavigate } from "react-router-dom";

interface Transcript {
  _id: string;
  rawTranscript: string;
  createdAt: string;
}

interface Props {
  transcripts: Transcript[];
}

const TranscriptList = ({ transcripts }: Props) => {
  const navigate = useNavigate();

  if (transcripts.length === 0) {
    return <div className="text-sm text-gray-500">No transcripts yet.</div>;
  }

  return (
    <div className="space-y-3">
      {transcripts.map((item) => (
        <div
          key={item._id}
          onClick={() => navigate(`/transcript/${item._id}`)}
          className="p-3 border rounded cursor-pointer hover:bg-gray-50"
        >
          <div className="text-sm font-medium truncate">
            {item.rawTranscript.slice(0, 60)}...
          </div>
          <div className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptList;
