// Global State/PostsContext/PostsContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  const saveToStorage = (data) => {
    setPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  };

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now() };
    saveToStorage([newPost, ...posts]);
  };

  const deletePost = (id) => {
    saveToStorage(posts.filter((p) => p.id !== id));
  };

  const editPost = (id, updatedData) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    saveToStorage(updated);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost, editPost }}>
      {children}
    </PostsContext.Provider>
  );
};
