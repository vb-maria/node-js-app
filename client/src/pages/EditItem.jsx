import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        const { name, desc, price } = response.data;
        setName(name);
        setDesc(desc);
        setPrice(price);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/items/${id}`, { name, desc, price });
      navigate("/");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Link to="/" className="p-4 bg-black text-white">
        Go back
      </Link>
      <div className="container mx-auto my-8 p-8 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
