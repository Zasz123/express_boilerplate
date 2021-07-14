import { Container } from "typedi";
import logger from "./logger";

interface IProps {
  models: Array<{ model: any; name: string }>;
}

export default ({ models }: IProps) => {
  models.forEach((item) => Container.set(item.name, item.model));

  Container.set("logger", logger);
};
