import ReportRange from "./components/range";
import ReportTrack from "./components/track";

const defaultProps = {
  answers: [],
  questions: [],
  data: undefined,
};
export const reportElements = {
  range: <ReportRange {...defaultProps} />,
  track: <ReportTrack {...defaultProps} />,
};
