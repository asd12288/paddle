"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

const Payment = () => {
  const [paddle, setPaddle] = useState<Paddle | null>(null);

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
      items: [{ priceId: "pro_01jkt99bn3py1ndtbgs6bshq4e", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "http://localhost:3000", // Ensure it matches your Paddle settings
      },
    });
  };

  return (
    <div>
      <button
        className="text-lg bg-green-800 hover:bg-green-900 px-2 py-1 text-white rounded-lg"
        onClick={handleCheckout}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
