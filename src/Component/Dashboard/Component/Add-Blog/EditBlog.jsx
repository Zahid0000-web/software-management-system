import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5001/api/blogs";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    detailed: "",
    category: "",
    imgUrl: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Blog not found");
          return;
        }

        setForm({
          title: data?.title || "",
          description: data?.description || "",
          detailed: data?.detailed || "",
          category: data?.category || "",
          imgUrl: data?.imgUrl || "",
        });
      } catch (err) {
        console.log("Fetch single blog error:", err);
        setError("Failed to load blog");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!form.title || !form.description || !form.detailed || !form.category || !form.imgUrl) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update blog");
        setLoading(false);
        return;
      }

      navigate("/dashboard/manage-blogs");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Detailed Content</label>
          <textarea
            name="detailed"
            value={form.detailed}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows="6"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            name="imgUrl"
            value={form.imgUrl}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded font-medium hover:bg-green-700 disabled:bg-green-300"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;