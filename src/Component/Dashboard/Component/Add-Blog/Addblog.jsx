import { useState, useEffect } from "react";

const API = "http://localhost:5001/api/blogs";

const emptyForm = {
  title: "",
  image: "",
  category: "General",
  date: "",
  views: 0,
  description: "",
  author: "",
};

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list"); // "list" | "form"
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : data.data || data.blogs || []);
    } catch {
      showToast("Failed to load blogs.", "error");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.author) {
      showToast("Title, description and author are required.", "error");
      return;
    }
    const payload = {
      title: form.title,
      description: form.description,
      detailed: form.description,
      category: form.category,
      imgUrl: form.image,
      date: form.date || new Date().toISOString(),
      views: form.views || 0,
      author: form.author,
    };
    setLoading(true);
    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showToast("Blog updated successfully! ✅");
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showToast("New blog published! 🎉");
      }
      setForm(emptyForm);
      setEditId(null);
      setView("list");
      fetchBlogs();
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    }
    setLoading(false);
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      image: blog.imgUrl || blog.image || "",
      category: blog.category || "General",
      date: blog.date || new Date(blog.createdAt).toISOString().split("T")[0],
      views: blog.views || 0,
      description: blog.description || blog.detailed || blog.content || "",
      author: blog.author || "",
    });
    setEditId(blog._id);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      showToast("Blog deleted successfully.");
      setDeleteModal(null);
      fetchBlogs();
    } catch {
      showToast("Failed to delete blog.", "error");
    }
    setLoading(false);
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Delete Blog?
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to permanently delete
              <span className="font-semibold text-gray-700"> "{deleteModal.title}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal._id)}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Delete Karein
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Blog Admin</h1>
              <p className="text-xs text-gray-400">{blogs.length} blogs</p>
            </div>
          </div>
          {view === "list" ? (
            <button
              onClick={() => setView("form")}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Post
            </button>
          ) : (
            <button
              onClick={cancelForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition"
            >
              ← Back
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* === FORM VIEW === */}
        {view === "form" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editId ? "✏️ Edit Blog" : "📝 New Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title <span className="text-red-500">*</span>
                </label>
                  <input
                    type="text"
                    placeholder="Enter a compelling blog title..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
              </div>

              {/* Author + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Author <span className="text-red-500">*</span>
                  </label>
                    <input
                      type="text"
                      placeholder="Author name"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white"
                  >
                    <option>General</option>
                    <option>Technology</option>
                    <option>Travel</option>
                    <option>Food</option>
                    <option>Health</option>
                    <option>Business</option>
                    <option>Education</option>
                    <option>Entertainment</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                  <textarea
                    rows={8}
                    placeholder="Write your blog description here..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Views
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.views}
                    onChange={(e) =>
                      setForm({ ...form, views: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Buttons */}
                <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition"
                >
                  {loading
                    ? "Saving..."
                    : editId
                    ? "Update Post"
                    : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* === LIST VIEW === */}
        {view === "list" && (
          <div>
            {loading && blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="font-medium text-gray-500 mb-1">No posts yet</p>
                <p className="text-sm text-gray-400 mb-4">Add your first blog</p>
                <button
                  onClick={() => setView("form")}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition"
                >
                  Write a Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover Image */}
                      {(blog.imgUrl || blog.image) && (
                        <img
                          src={blog.imgUrl || blog.image}
                          alt={blog.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
                            {blog.title}
                          </h3>
                          <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                            Blog
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {blog.author}
                          </span>
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded-md">
                            {blog.category}
                          </span>
                          <span>
                            {new Date(blog.date || blog.createdAt).toLocaleDateString("en-US")}
                          </span>
                          <span>
                            {blog.views != null ? `${blog.views} views` : ""}
                          </span>
                        </div>

                        {/* Content preview */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                          {blog.description || blog.detailed || blog.content}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-lg hover:bg-indigo-100 transition"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteModal(blog)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 transition"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}