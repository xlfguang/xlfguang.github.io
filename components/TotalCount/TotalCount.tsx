import style from "./TotalCount.module.sass";
type add = true;
type sub = false;
export interface TotalCountData {
  total: number | string;
  addOrsub?: add | sub;
  deviation: string;
}
const TotalCount = (TotalCountData: TotalCountData) => {
  const { total, addOrsub, deviation } = TotalCountData;
  return (
    <div className={style.TotalCountBox}>
      <span className="TotalCountTitle">园区本年度碳排放总量</span>
      <div>
        <span className="TotalCountNum">{total}</span>
        <span className="goldenlabel">kgCO2e</span>
      </div>
      <div className={style.line}></div>
      <div>
        <span className={style.addOrsub}>比去年{addOrsub?'增加':'减少'}</span>
        <span className={style.deviation}>{deviation}</span>
      </div>
    </div>
  );
};

export default TotalCount;
