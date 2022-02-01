const Button = ({text, disabled, invisible, onClick}) => {
  return <button disabled={disabled} onClick={onClick} class={`p-2 rounded-full bg-gray-300 ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-blue-500"} ${invisible ? "invisible" : ""}`}>{text}</button>
};

export default Button;
