import { Text } from "@chakra-ui/layout";

/**
 * format a number depending on the parameters. 
 * @param {*} number 
 * @returns the formatted number
 */
const TextFormatNumber = ({ number, isPercentage = false, color = '#000000', roundUp = false }) => {
  let roundedNumber = 0;
  if (roundUp) {
    roundedNumber = Math.ceil(number);
  } else {
    roundedNumber = Math.round(number * 100) / 100;
  }
  return  isPercentage ? (
    <Text color={color}>{roundedNumber} %</Text>
  ) : (
    <Text color={color}>{roundedNumber}</Text>
  );
};

export default TextFormatNumber;
