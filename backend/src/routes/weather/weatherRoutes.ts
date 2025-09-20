import { Router } from 'express';
import { WeatherController } from '../../controllers/weather/WeatherController.js';

const router = Router();
const weatherController = new WeatherController();

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getWeatherForecast);
router.get('/search', weatherController.searchLocations);

export default router;
