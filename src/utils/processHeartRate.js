import moment from "moment";

const processHeartRate = (data) => {
  let aggregatedData = [];
  let intervalStart = null;
  let intervalData = [];

  data.forEach((reading) => {
    const timestamp = moment(reading.on_date);
    const roundedIntervalStart = timestamp
      .clone()
      .startOf("minute")
      .minutes(Math.floor(timestamp.minutes() / 15) * 15);

    if (!intervalStart || roundedIntervalStart.isAfter(intervalStart)) {
      if (intervalData.length > 0) {
        const minHeartRate = Math.min(...intervalData);
        const maxHeartRate = Math.max(...intervalData);

        aggregatedData.push({
          from_date: intervalStart.toISOString(),
          to_date: intervalStart.clone().add(15, "minutes").toISOString(),
          measurement: {
            low: minHeartRate.toString(),
            high: maxHeartRate.toString(),
          },
          ...(minHeartRate !== null && { low: minHeartRate }),
          ...(maxHeartRate !== null && { high: maxHeartRate }),
        });
      }

      intervalStart = roundedIntervalStart;
      intervalData = [parseInt(reading.measurement)];
    } else {
      intervalData.push(parseInt(reading.measurement));
    }
  });

  if (intervalData.length > 0) {
    const minHeartRate = Math.min(...intervalData);
    const maxHeartRate = Math.max(...intervalData);
    aggregatedData.push({
      from_date: intervalStart.toISOString(),
      to_date: intervalStart.clone().add(15, "minutes").toISOString(),
      measurement: {
        low: minHeartRate.toString(),
        high: maxHeartRate.toString(),
      },
      ...(minHeartRate !== null && { low: minHeartRate }),
      ...(maxHeartRate !== null && { high: maxHeartRate }),
    });
  }

  return aggregatedData;
};

export default processHeartRate;
