import * as Joi from 'joi';
import { pick } from 'lodash';

const CONFIG_KEYS = [
  'IP_API_BASE_URL',
  'OPEN_WEATHER_BASE_URL',
  'OPEN_WEATHER_API_KEY',
  'MAP_QUEST_BASE_URL',
  'MAP_QUEST_API_KEY',
];
const uriRequired = Joi.string().uri().required();
const stringRequired = Joi.string().required();

const schema = Joi.object().keys({
  IP_API_BASE_URL: uriRequired,
  OPEN_WEATHER_BASE_URL: uriRequired,
  OPEN_WEATHER_API_KEY: stringRequired,
  MAP_QUEST_BASE_URL: stringRequired,
  MAP_QUEST_API_KEY: stringRequired,
});

const items = pick(process.env, CONFIG_KEYS);
const config = schema.validate(items);
if (config.error) {
  throw new Error(
    `Missing environment variable\n
    ${config.error.toString()}\n
    HINT => Compare your .env file with .env.example\n`,
  );
}

export default {
  ipApiMicroserviceBaseUrl: config.value.IP_API_BASE_URL,
  openWeatherBaseUrl: config.value.OPEN_WEATHER_BASE_URL,
  openWeatherApiKey: config.value.OPEN_WEATHER_API_KEY,
  mapQuestBaseUrl: config.value.MAP_QUEST_BASE_URL,
  mapQuestApiKey: config.value.MAP_QUEST_API_KEY,
};
