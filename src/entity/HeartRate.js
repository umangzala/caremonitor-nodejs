import { EntitySchema } from "typeorm";

const HeartRate = new EntitySchema({
  name: "HeartRate",
  tableName: "heart_rate",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    from_date: {
      type: "timestamptz",
      nullable: true,
    },
    to_date: {
      type: "timestamptz",
      nullable: true,
    },
    low: {
      type: "float",
      nullable: true,
    },
    high: {
      type: "float",
      nullable: true,
    },
  },
  indices: [
    { name: "idx_from_date", columns: ["from_date"] },
    { name: "idx_to_date", columns: ["to_date"] },
  ],
});

export default HeartRate;
