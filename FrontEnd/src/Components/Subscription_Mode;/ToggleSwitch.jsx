import "./ToggleSwitch.css";
// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ showMonthly, handleToggle }) => {
  return (
    <span className="switch">
      <input
        type="checkbox"
        checked={!showMonthly}
        onChange={handleToggle}
        id="switcher"
      />
      <label htmlFor="switcher"></label>
    </span>
  );
};

export default ToggleSwitch;
