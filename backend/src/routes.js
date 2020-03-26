const express = require('express');

const OngController = require('./controllers/ong.controller');
const IncidentController = require('./controllers/incident.controller');
const ProfileController = require('./controllers/profile.controller');
const SessionController= require('./controllers/session.controller');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;
