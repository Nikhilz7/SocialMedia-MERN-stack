import "./spinner.styles.css";
import { MoonLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div>
      <div class="SpinnerOverlay">
        <MoonLoader color="#0500ff" size={150} speedMultiplier={0.7} />
      </div>
    </div>
  );
};

export default Spinner;
