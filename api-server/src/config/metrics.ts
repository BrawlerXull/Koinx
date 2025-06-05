
import express from 'express';
import client from 'prom-client';

const app = express();
const register = new client.Registry();


client.collectDefaultMetrics({ register });

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export function startMetricsServer() {
  const port = Number(process.env.METRICS_PORT || 9100);
  app.listen(port, () => {
    console.log(`📊 Prometheus metrics available at http://localhost:${port}/metrics`);
  });
}
