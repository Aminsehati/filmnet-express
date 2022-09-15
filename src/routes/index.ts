import genreRoutes from './genre'
import countryRoutes from './country'
import contentRoutes from './content'
import artistRoutes from './artist'
import AuthRoutes from './auth'
import { Express } from 'express'
export default (app: Express) => {
    app.use("/api/v1/genre", genreRoutes);
    app.use("/api/v1/country", countryRoutes);
    app.use("/api/v1/content", contentRoutes);
    app.use("/api/v1/artist", artistRoutes);
    app.use("/api/v1/auth", AuthRoutes);
}