import styles from "./LandingPage.module.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";


function LandingPage() {
  return (
    <>
      <Header/>
      <div className={styles.grid}>
        <Hero/>
        <Features/>
        <Footer/>
      </div>
    </>
  );
}

export default LandingPage;
