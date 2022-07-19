import styles from "./InfoCard.module.sass";
import Image from "next/image";

type add = true;
type sub = false;
export type InfoCardData = {
  name: string;
  loc: string;
  addOrSub: add | sub;
  total: number;
  deviation: string;
};
const InfoCard = (InfoCardData: InfoCardData) => {
  const { name, loc, addOrSub, total, deviation } = InfoCardData;
  return (
    <div className={styles.InfoCardBox}>
      <div className={styles.left}>
        <img className={styles.leftImg} src="/images/Group.png" alt="加载失败"></img>
        <div className={styles.leftText}>
          <span className={styles.title}>{name}</span>
          <span className={styles.loc}>{loc}</span>
        </div>
      </div>
      <div className={styles.right}>
        <span className="TotalCountTitle">园区本年度碳排放总量</span>
        <div>
          <span className="TotalCountNum">{total}</span>
          <span className="goldenlabel">kgCO2e</span>
        </div>
        <div className={styles.line}></div>
        <div>
          <span className={styles.addOrsub}>
            比去年{addOrSub ? "增加" : "减少"}
          </span>
          <span className={styles.deviation}>{deviation}</span>
        </div>
      </div>
    </div>
  );
};
export default InfoCard;
