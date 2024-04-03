import { RestService } from "../../services/rest.service";
import {ApplicationApiDescriptionModelRequestDto,} from "../models";

export const getAppConfig = async function getAbpApplicationConfigurationService(model: ApplicationApiDescriptionModelRequestDto) {
  return RestService(model.api_url);
}