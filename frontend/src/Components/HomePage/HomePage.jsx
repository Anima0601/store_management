import React from "react";
import Card from "../Card/Card";

export default function HomePage() {
  return (
    <div>
    <div className="hero bg-blue-100 min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="/homepageimg.jpg"
          className="w-100 h-100 object-cover rounded-lg shadow-2xl"
          alt="Store illustration"
        />
        <div className="lg:ml-10 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Manage & Rate Stores Easily</h1>
          <p className="py-6 text-gray-600 text-lg">
            Welcome to our <b>Store Management Platform</b>!
            Browse through registered stores, explore details, and share your experience.
            Users can submit <b>ratings from 1 to 5 stars</b>, helping others make informed choices while
            providing valuable feedback for stores to improve.
          </p>
          <button className="btn btn-primary">Explore Stores</button>
        </div>
      </div>
    </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        <Card
          image="/img1car.jpg"
          title="Nearby Stores"
          description="Browse stores registered on our platform and find the best options near you."
          buttonText="View Stores"
        />
        <Card
          image="/img2car.jpg"
          title="Rate & Review"
          description="Submit your ratings (1-5 stars) and share honest reviews to help others."
          buttonText="Give Rating"
        />
        <Card
          image="/img3car.jpg"
          title="Store Insights"
          description="Help stores improve with feedback and explore customer-driven insights."
          buttonText="Learn More"
        />
      </div>
      </div>

  );
}

