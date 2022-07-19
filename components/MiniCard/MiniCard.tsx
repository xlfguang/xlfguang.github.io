import style from "./MiniCard.module.sass";


/**
 * @param emissions 碳排放量
 * */

export type MiniCardProps = {
  id: string|number;
  title: string;
  iconImg: string;
  time: string;
  emissions: string;
  linkFun?:()=>void;
  appendButto?:JSX.Element |  any
};

const MiniCard = (MiniCardProps: MiniCardProps) => {
  const { title, iconImg, time, emissions,appendButto,linkFun } = MiniCardProps;
  return (
    <div className={style.miniCardBox} onClick={linkFun}>
      <div className={style.miniCardIconBox}>
        <img src={iconImg} alt="" />
        <span>{title}</span>
      </div>
      <div className={style.miniCardTimeBox}>
        <span className={style.tipsTitle}>日期</span>
        <span className={style.miniCardIconBox}>
          <img src="/images/icon-time.png" alt="" />
          <span className={style.time}>{time}</span>
        </span>
      </div>
      <div>
        <span className={style.tipsTitle}>碳排放量</span>
        <div>
          <span className={style.emissions}>{emissions}</span>
          <span className="goldenlabel">kgCO2e</span>
        </div>
      </div>
      {appendButto}
    </div>
  );
};

export default MiniCard;
