import { Skeleton } from "antd";
import style from "./ParkCard.module.sass";
export interface ParkCardData {
  parkName: string;
  parkLoc: string;
  parktype: string;
  parknum: number;
  area: number | string;
  isLoging?: boolean;
}
const ParkCard = (ParkCardData: ParkCardData) => {
  const { parkName, parkLoc, parktype, parknum, area } = ParkCardData;
  return (
    <div className={style.ParkCard}>
      <img className={style.industry} src="/images/industry.png" alt="" />
      <div className={style.parkInfoBox}>
        <span className={style.parkName}>{parkName}</span>
        <span className={style.parkLoc}>{parkLoc}</span>
        <div className={style.parkInfoItem}>
          <div className={style.phoneRow}>
            <span className={style.parkInfoTitle}>类型</span>
            <span className={style.parkInfoCentent}>{parktype}</span>
          </div>
          <div className={style.phoneRow}>
            <span className={style.parkInfoTitle}>企业数</span>
            <span className={style.parkInfoCentent}>{parknum}</span>
          </div>
          <div className={style.phoneRow}>
            <span className={style.parkInfoTitle}>面积</span>
            <span className={style.parkInfoCentent}>{area}</span>
          </div>
          <div className="goldenlabel">平方公里</div>
        </div>
      </div>
    </div>
  );
};

export default ParkCard;
