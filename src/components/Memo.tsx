import styles from "./Memo.module.css";
import { useEffect, useState, useRef } from "react";

const Memo = () => {
  const URL = import.meta.env.VITE_URL;
  const [text, setText] = useState("");
  const isInitialMount = useRef(true);
  useEffect(() => {
    const handler = setTimeout(() => {
      const saveMemo = async () => {
        const res = await fetch(`${URL}data/home/memo`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memo: text,
          }),
        });
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
      const res = await fetch(`${URL}data/home/memo`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        const data = await res.json();
        setText(data.memo);
      }
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
