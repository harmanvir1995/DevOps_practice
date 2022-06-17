import { Text } from "@chakra-ui/layout";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TextFormatTime = ({ hours, color = '#000000', roundUp = false }) => {
  let time = "";
  if (roundUp) {
    let minutes = Math.trunc(hours * 60);
    /*we round up the time to the superior hour if roundUp=true*/
    if (minutes >= 0) {
      time =  (minutes % 60) === 0 ? Math.trunc(minutes / 60) + "h" : Math.trunc((minutes / 60) + 1) + "h";
    } else {
      time =  (minutes % 60) === 0 ? Math.trunc(minutes / 60) + "h" : Math.trunc((minutes / 60) - 1) + "h";
    }
  } else {
    let minutes = Math.trunc(hours * 60);
    /*we display the time as it is if roundUp=false*/
    time =  (minutes % 60) === 0 ? Math.trunc(minutes / 60) + "h" : Math.trunc(minutes / 60) + "h " + minutes % 60 + "m";
  }
  return (
    <Text color={color}>{time}</Text>
  );
};

export default TextFormatTime;
