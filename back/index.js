require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const ENTITY_CONFIG = {
  'Сделка': { endpoint: 'leads', key: 'leads' },
  'Контакт': { endpoint: 'contacts', key: 'contacts' },
  'Компания': { endpoint: 'companies', key: 'companies' }
};

app.post('/create-entity', async (req, res) => {
  try {
    const { entityType, data } = req.body;
    
    if (!entityType || !data) {
      return res.status(400).json({ error: 'Missing entityType or data' });
    }

    const tokenResponse = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
      headers: { 'X-Client-Id': process.env.CLIENT_ID }
    });

    const { access_token, base_domain } = tokenResponse.data;

    const entity = ENTITY_CONFIG[entityType];
    if (!entity) {
      return res.status(400).json({ error: 'Unsupported entity type' });
    }

    const response = await axios.post(
      `https://${base_domain}/api/v4/${entity.endpoint}`,
      [data],
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const createdEntity = response.data._embedded[entity.key][0];
    res.json({ id: createdEntity.id });

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    
    const status = error.response?.status || 500;
    const message = error.response?.data || { error: error.message };
    
    res.status(status).json(message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});