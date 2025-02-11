"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

const Payment = () => {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    })
      .then((paddle) => {
        setPaddle(paddle);
      })
      .catch((error) => {
        console.error("Paddle initialization failed:", error);
      });
  }, []);

  const handleCheckout = () => {
    if (!paddle) return alert("Paddle not initialized");

    paddle.Checkout.open({
      items: [{ priceId: "pri_01jkt9ansy387jv3d6sca3hcf9", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "http://localhost:3000/",
      },
    });
  };
  return (
    <div>
      <button
        className="text-lg bg-green-800 hover:bg-green-900 px-2 py-1 text-white rounded-lg"
        onClick={handleCheckout}
      >
        Procced to payment
      </button>
    </div>
  );
};

export default Payment;
