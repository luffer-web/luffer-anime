import { useSnapshot } from "valtio";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { store } from "@/app/libs/valtio";
import styles from "./styles.module.css";

const Info = () => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const type = anime?.data[snap.pos]?.type || "";
  const source = anime?.data[snap.pos]?.source || "";
  const episodes = anime?.data[snap.pos]?.episodes || 0;
  const status = anime?.data[snap.pos]?.status || "";
  const rating = anime?.data[snap.pos]?.rating || "";
  const fromDay = anime?.data[snap.pos]?.aired.prop.from.day || "-";
  const fromMonth = anime?.data[snap.pos]?.aired.prop.from.month || "-";
  const fromYear = anime?.data[snap.pos]?.aired.prop.from.year || "-";
  const toDay = anime?.data[snap.pos]?.aired.prop.to.day || "-";
  const toMonth = anime?.data[snap.pos]?.aired.prop.to.month || "-";
  const toYear = anime?.data[snap.pos]?.aired.prop.to.year || "-";

  return (
    <table className={`${styles.table}`}>
      <tbody>
        <tr>
          <td>TYPE:</td>
          <td>{type}</td>
        </tr>
        <tr>
          <td>SOURCE:</td>
          <td>{source}</td>
        </tr>
        <tr>
          <td>EPISODES:</td>
          <td>{episodes}</td>
        </tr>
        <tr>
          <td>STATUS:</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>RATING:</td>
          <td>{rating}</td>
        </tr>
        <tr>
          <td>FROM:</td>
          <td>{fromDay + "/" + fromMonth + "/" + fromYear}</td>
        </tr>
        <tr>
          <td>TO:</td>
          <td>{toDay + "/" + toMonth + "/" + toYear}</td>
        </tr>
      </tbody>
    </table>
  );
};

export { Info };
