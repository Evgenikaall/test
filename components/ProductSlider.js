import React, { useState, useEffect } from "react";
import ProductBlock from "./ProductBlock";
import styles from "../styles/ProductSlider.module.css";

const products = [
  { name: "Product 1", image: "/product.png", price: "$10" },
  { name: "Product 2", image: "/product.png", price: "$20" },
  { name: "Product 3", image: "/product.png", price: "$30" },
  { name: "Product 4", image: "/product.png", price: "$40" },
  { name: "Product 5", image: "/product.png", price: "$50" },
  { name: "Product 6", image: "/product.png", price: "$60" },
  { name: "Product 7", image: "/product.png", price: "$70" },
  { name: "Product 8", image: "/product.png", price: "$80" },
  { name: "Product 9", image: "/product.png", price: "$90" },
  { name: "Product 10", image: "/product.png", price: "$100" },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(null);
  const [blockCount, setBlockCount] = useState(3);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (width <= 768) {
      setBlockCount(1);
    } else if (width <= 1024) {
      setBlockCount(2);
    } else {
      setBlockCount(3);
    }
  }, [width]);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(products.length - blockCount);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex === products.length - blockCount) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderDesktopSlider = () => {
    return (
      <div className={styles.productSliderContainer}>
        <button onClick={handlePrevClick} className={styles.prevButton}>
          <img className={styles.Back} src="/arrow.svg" alt="Back" />
        </button>
        <div className={styles.productSlider}>
          {products.slice(currentIndex, currentIndex + blockCount).map((product, index) => (
            <ProductBlock key={index} image={product.image} title={product.name} price={product.price} />
          ))}
        </div>
        <button onClick={handleNextClick} className={styles.nextButton}>
          <img className={styles.Next} src="/arrow.svg" alt="Next" />
        </button>
      </div>
    );
  };

  const renderMobileSlider = () => {
    return (
      <div className={styles.productSliderContainer}>
        <button onClick={handlePrevClick} className={styles.prevButton}>
          <img className={styles.Back} src="/arrow.svg" alt="Back" />
        </button>
        <div className={styles.productSlider}>
          <ProductBlock image={products[currentIndex].image} title={products[currentIndex].name} price={products[currentIndex].price} />
        </div>
        <button onClick={handleNextClick} className={styles.nextButton}>
          <img className={styles.Next} src="/arrow.svg" alt="Next" />
        </button>
      </div>
    );
  };

  return width <= 768 ? renderMobileSlider() : renderDesktopSlider();
};

export default ProductSlider;
