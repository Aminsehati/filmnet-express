import genreRoutes from './genre'
import countryRoutes from './country'
import { Express } from 'express'
export default (app: Express) => {
    app.use("/api/v1/genre", genreRoutes);
    app.use("/api/v1/country", countryRoutes);
}