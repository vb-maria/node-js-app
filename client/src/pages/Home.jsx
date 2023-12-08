import React from "react";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/images/default.jpg"

export default function Home() {
  const { mutate } = useSWRConfig();
  const { data: items, error } = useSWR("http://localhost:5000/items", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <h2>Error loading items</h2>;
  if (!items) return <h2>Loading...</h2>;

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/items/${itemId}`);
      mutate("http://localhost:5000/items");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 justify-start w-full h-full min-h-[100vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-3/4 md:w-full">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white p-8 w-full rounded-md shadow-md flex flex-col">
            <img
              src={DefaultImage}
              alt="Default"
              className="object-cover h-32 w-full rounded-md mb-2"
            />
            <h3 className="text-xl font-medium mb-2">{item.name}</h3>
            <p className="text-xl text-gray-700 mb-2">{item.desc}</p>
            <p className="text-xl text-gray-700">Price: {item.price} €</p>
            <div className="flex justify-end mt-2">
              <Link
                to={`/edit/${item.id}`}
                className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

