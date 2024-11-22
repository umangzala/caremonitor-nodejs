import fs from "fs/promises"; // Using fs.promises for async/await
import path from "path";
import { fileURLToPath } from "url";
import { getRepository } from "typeorm";
import HeartRate from "../entity/HeartRate.js";
import processHeartRate from "../utils/processHeartRate.js";
import upload from "../utils/multerConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFolder = path.join(__dirname, "../../uploads");

fs.mkdir(uploadFolder, { recursive: true })
  .then(() => console.log("Upload folder is ready"))
  .catch((err) => console.error("Error creating upload folder:", err));

const readAndProcessHeartRateData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    const heartRateData = jsonData.clinical_data.HEART_RATE.data;

    if (!heartRateData || heartRateData.length === 0) {
      throw new Error("No heart rate data found in the file");
    }

    return processHeartRate(heartRateData);
  } catch (error) {
    throw new Error(
      "Error reading or processing heart rate data: " + error.message
    );
  }
};

const saveHeartRateData = async (processedData) => {
  const heartRateRepository = getRepository(HeartRate);
  try {
    const formattedData = processedData.map((entry) => ({
      ...entry,
      from_date: new Date(entry.from_date).toISOString(),
      to_date: new Date(entry.to_date).toISOString(),
    }));

    await heartRateRepository.save(formattedData);
    console.log("Heart rate data saved to the database.");
  } catch (error) {
    throw new Error("Error saving data to the database: " + error.message);
  }
};

const processHeartRateData = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  try {
    const filePath = req.file.path;
    const processedData = await readAndProcessHeartRateData(filePath);

    await saveHeartRateData(processedData);

    const jsonData = JSON.parse(await fs.readFile(filePath, "utf-8"));

    const formattedHeartRateData = processedData.map((entry) => {
      return {
        from_date: entry.from_date,
        to_date: entry.to_date,
        measurement: {
          low: entry.low ? parseFloat(entry.low) : null,
          high: entry.high ? parseFloat(entry.high) : null,
        },
        id: entry.id,
      };
    });

    const response = {
      patient_id: jsonData.patient_id,
      clinical_data: {
        HEART_RATE: formattedHeartRateData,
        STEPS: jsonData.clinical_data.STEPS,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getHeartRateData = async (req, res) => {
  try {
    const heartRateRepository = getRepository(HeartRate);
    const heartRateData = await heartRateRepository.find();
    res.status(200).json(heartRateData);
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res
      .status(500)
      .send({ message: "Error retrieving data from the database" });
  }
};

export { upload, processHeartRateData, getHeartRateData };
