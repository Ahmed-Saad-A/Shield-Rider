import React from "react";
import { motion } from "framer-motion";
import carImg from "/src/assets/images/Logo.png";
import styles from "./Home.module.css";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Main Text */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={styles.textBox}
      >
        <h1>
          Drive Safe with <span>ShieldRider</span>
        </h1>
        <p>The ultimate platform to insure your car quickly and easily.</p>
        <NavLink to="/aply" className={`${styles.ctaBtn}`}>
          Get Started <ArrowRight size={20} />
        </NavLink>
      </motion.div>

      <div className={styles.smoke}></div>
      <div
        className={styles.smoke}
        style={{ animationDelay: "1s", right: "160px" }}
      ></div>
      <div
        className={styles.smoke}
        style={{
          animationDelay: "2s",
          right: "140px",
          width: "50px",
          height: "50px",
        }}
      ></div>

      {/* Car */}
      <motion.img
        src={carImg}
        alt="car"
        className={styles.carImg}
        initial={{ y: 300, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, delay: 1.2 }}
      />
    </div>
  );
};

export default Home;
