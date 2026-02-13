import axios from "axios";

interface ActionItem {
  _id: string;
  task: string;
  owner: string | null;
  dueDate: string | null;
  status: "open" | "done";
  summary: string;
}

interface Props {
  item: ActionItem;
  refresh: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const ActionItemCard = ({ item, refresh }: Props) => {
  const token = localStorage.getItem("token");

  const toggleStatus = async () => {
    await axios.put(
      `${API_URL}/action/${item._id}`,
      {
        status: item.status === "open" ? "done" : "open",
      },
      { headers: { Authorization: token || "" } }
    );

    refresh();
  };

  const deleteAction = async () => {
    await axios.delete(`${API_URL}/action/${item._id}`, {
      headers: { Authorization: token || "" },
    });

    refresh();
  };

  return (
    <div className="border p-4 rounded flex justify-between items-start">
      <div>
        <div
          className={
            item.status === "done"
              ? "line-through text-gray-500"
              : "font-medium"
          }
        >
          {item.task}
        </div>
        <div className="text-sm text-gray-600">
          Owner: {item.owner || "Not mentioned"}
        </div>
        <div className="text-sm text-gray-600">
          Due: {item.dueDate || "Not mentioned"}
        </div>
        <div className="text-sm text-gray-600">Summary: {item.summary}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleStatus}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded"
        >
          {item.status === "done" ? "Undo" : "Done"}
        </button>

        <button
          onClick={deleteAction}
          className="text-sm px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActionItemCard;
