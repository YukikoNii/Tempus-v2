import styles from "./Memo.module.css";
import { useEffect, useState, useRef } from "react";
import { homeApi } from "../services/api";


const Memo = () => {
  const [text, setText] = useState("");
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      const saveMemo = async () => {
        await homeApi.saveMemo(text);
      };
      saveMemo();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchBg = async () => {
      const data = await homeApi.getMemo();
      setText(data.memo);
    };
    fetchBg();
  }, []);

  return (
    <>
      <div className={styles.stats}>
        <span>Memo</span>
        <textarea
          value={text}
          className={styles.textarea}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
        ></textarea>
      </div>
    </>
  );
};

export default Memo;
