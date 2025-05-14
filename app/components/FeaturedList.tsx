// app/components/FeatureList.tsx
import React from "react";
import styles from "../routes/_index/styles.module.css"; // use the same CSS module

const features = [
  {
    title: "Seamless Integration",
    description: "Connect your Shopify store effortlessly and start syncing instantly.",
  },
  {
    title: "Real-time Sync",
    description: "Get instant updates between your store and our app.",
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights with detailed sales and product analytics.",
  },
];

export default function FeatureList() {
  return (
    <ul className={styles.list}>
      {features.map((feature, index) => (
        <li key={index}>
          <strong>{feature.title}</strong>. {feature.description}
        </li>
      ))}
    </ul>
  );
}
