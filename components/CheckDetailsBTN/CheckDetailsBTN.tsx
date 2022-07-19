import { Button } from "antd";

interface checkDetailsBTNProps {
  btnText?: string | "查看详情";
  btnClickFun?:()=>void
}
const btnStyel = {
    background: "#F1FCF8",
    color: "#10B482",
    border: "none",
  };
const CheckDetailsBTN = (checkDetailsBTNProps:checkDetailsBTNProps={
    btnText:'查看详情'
}) => {
    const {btnText,btnClickFun} = checkDetailsBTNProps
  return (
    <Button
      onClick={btnClickFun}
      style={btnStyel}
      type="primary"
      shape="round"
    >
      {btnText}
    </Button>
  );
};
export default CheckDetailsBTN;
