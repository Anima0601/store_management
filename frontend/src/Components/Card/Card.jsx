import React from "react";

export default function Card({ image, title, description, buttonText }) {
  return (
    <div className="card bg-base-100 shadow-md h-full">
      <figure className="px-6 pt-6">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center flex flex-col justify-between">
        <div>
          <h2 className="card-title text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <div className="card-actions mt-4">
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
