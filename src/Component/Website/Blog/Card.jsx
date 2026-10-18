import React, { useEffect, useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { PiEyeLight } from "react-icons/pi";
import { apiUrl } from "../api";

const API = apiUrl("/api/blogs");

/* ── tiny hook: lock body scroll when modal is open ── */
const useLockBody = (active) => {
  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
};

const Card = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [closing, setClosing] = useState(false);

  useLockBody(modalOpen);

  /* ── fetch ── */
  const fetchBlogs = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  /* ── modal ── */
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
    setClosing(false);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setSelectedBlog(null);
      setClosing(false);
    }, 300);
  };

  /* ── close on Escape ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && modalOpen) closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .blogs-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f4ef;
          min-height: 100vh;
          padding: 60px 0 80px;
        }

        /* ── hero heading ── */
        .blogs-heading {
          text-align: center;
          margin-bottom: 56px;
          padding: 0 24px;
        }
        .blogs-heading .eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #b07d4b;
          margin-bottom: 10px;
        }
        .blogs-heading h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #1a1209;
          line-height: 1.15;
          margin: 0;
        }
        .blogs-heading .rule {
          width: 48px;
          height: 3px;
          background: #b07d4b;
          margin: 18px auto 0;
          border-radius: 2px;
        }

        /* ── grid ── */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── card ── */
        .blog-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,.06);
          transition: transform .3s ease, box-shadow .3s ease;
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,.12);
        }

        /* image wrapper with overlay */
        .card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
        }
        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }
        .blog-card:hover .card-img-wrap img {
          transform: scale(1.06);
        }
        .card-category-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #b07d4b;
          color: #fff;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
        }

        /* card body */
        .card-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-meta {
          display: flex;
          gap: 14px;
          font-size: 11px;
          color: #999;
          margin-bottom: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .card-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.18rem;
          font-weight: 600;
          color: #1a1209;
          line-height: 1.35;
          margin: 0 0 6px;
        }
        .card-author {
          font-size: 12px;
          color: #b07d4b;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .card-desc {
          font-size: 13.5px;
          color: #6b6458;
          line-height: 1.65;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #f0ebe3;
        }
        .read-more-btn {
          background: #1a1209;
          color: #fff;
          border: none;
          padding: 9px 20px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: .04em;
          transition: background .2s, transform .15s;
        }
        .read-more-btn:hover {
          background: #b07d4b;
          transform: scale(1.03);
        }
        .views-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #aaa;
        }

        /* ── modal overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,8,5,.72);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn .25s ease;
        }
        .modal-overlay.closing {
          animation: fadeOut .3s ease forwards;
        }

        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }

        /* ── modal box ── */
        .modal-box {
          background: #fff;
          border-radius: 20px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp .3s cubic-bezier(.22,1,.36,1);
          scrollbar-width: thin;
          scrollbar-color: #e0d8cc transparent;
        }
        .modal-overlay.closing .modal-box {
          animation: slideDown .3s ease forwards;
        }

        @keyframes slideUp   { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0);    opacity: 1; } to { transform: translateY(40px); opacity: 0; } }

        .modal-img-wrap {
          position: relative;
          height: 280px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }
        .modal-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,.6) 0%, transparent 60%);
        }
        .modal-img-title {
          position: absolute;
          bottom: 20px;
          left: 28px;
          right: 60px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 1.65rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
        }

        .modal-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,.2);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,.3);
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .2s;
          z-index: 10;
          line-height: 1;
        }
        .modal-close-btn:hover { background: rgba(255,255,255,.35); }

        .modal-content {
          padding: 28px 32px 36px;
        }
        .modal-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 12px;
          color: #999;
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid #f0ebe3;
          align-items: center;
        }
        .modal-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .modal-author-tag {
          background: #fdf6ee;
          color: #b07d4b;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid #e8d9c4;
        }
        .modal-body-text {
          font-size: 15px;
          color: #3d3528;
          line-height: 1.85;
          white-space: pre-line;
        }
        .modal-bottom-close {
          display: flex;
          justify-content: flex-end;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f0ebe3;
        }
        .modal-bottom-close button {
          background: #1a1209;
          color: #fff;
          border: none;
          padding: 10px 28px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: .04em;
          transition: background .2s;
        }
        .modal-bottom-close button:hover { background: #b07d4b; }

        /* ── states ── */
        .state-msg {
          text-align: center;
          color: #aaa;
          font-size: 14px;
          padding: 60px 0;
          grid-column: 1 / -1;
        }
        .skeleton {
          background: linear-gradient(90deg, #ede9e2 25%, #e4dfd7 50%, #ede9e2 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
        .skeleton-card { height: 380px; border-radius: 16px; }
      `}</style>

      <section className="blogs-root">
        {/* heading */}
        <div className="blogs-heading">
          <p className="eyebrow">Our Journal</p>
          <h2>Latest Blogs</h2>
          <div className="rule" />
        </div>

        {/* grid */}
        <div className="blogs-grid">
          {loading && [1,2,3,4].map(n => (
            <div key={n} className="skeleton skeleton-card" />
          ))}

          {!loading && blogs.length === 0 && (
            <p className="state-msg">No blogs found.</p>
          )}

          {!loading && blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="card-img-wrap">
                <img
                  src={blog.imgUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"}
                  alt={blog.title}
                />
                {blog.category && (
                  <span className="card-category-badge">{blog.category}</span>
                )}
              </div>

              <div className="card-body">
                <div className="card-meta">
                  <span><BsCalendar2Date />
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "No Date"}
                  </span>
                </div>

                <h3 className="card-title">{blog.title}</h3>
                <p className="card-author">By {blog.author}</p>
                <p className="card-desc">{blog.description}</p>

                <div className="card-footer">
                  <button className="read-more-btn" onClick={() => openModal(blog)}>
                    Read Article →
                  </button>
                  <span className="views-pill">
                    <PiEyeLight size={14} /> {blog.views ?? 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* modal */}
      {modalOpen && selectedBlog && (
        <div className={`modal-overlay${closing ? " closing" : ""}`} onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {/* image + title */}
            <div className="modal-img-wrap">
              <img
                src={selectedBlog.imgUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"}
                alt={selectedBlog.title}
              />
              <div className="modal-img-overlay" />
              <h2 className="modal-img-title">{selectedBlog.title}</h2>
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            {/* content */}
            <div className="modal-content">
              <div className="modal-meta">
                <span className="modal-author-tag">By {selectedBlog.author}</span>
                {selectedBlog.category && (
                  <span><IoPricetagOutline /> {selectedBlog.category}</span>
                )}
                <span>
                  <BsCalendar2Date />
                  {selectedBlog.createdAt
                    ? new Date(selectedBlog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                    : "No Date"}
                </span>
                <span><PiEyeLight /> {selectedBlog.views ?? 0} views</span>
              </div>

              <p className="modal-body-text">
                {selectedBlog.detailed || selectedBlog.description || "No content available."}
              </p>

              <div className="modal-bottom-close">
                <button onClick={closeModal}>Close Article</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;