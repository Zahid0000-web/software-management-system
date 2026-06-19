import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5001/api/blogs";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data?.blogs) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setError("Failed to fetch blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg shadow p-3">
              <img
                src={blog.imgUrl}
                alt={blog.title}
                className="h-40 w-full object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=No+Image";
                }}
              />

              <h2 className="font-bold mt-2 text-lg">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.category}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/dashboard/edit/${blog._id}`)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;