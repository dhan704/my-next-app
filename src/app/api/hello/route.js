import { Client } from 'pg';

export async function GET(request) {
  // Create a new PostgreSQL client instance
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Use the connection string from .env.local
  });

  try {
    // Connect to the database
    await client.connect();

    // Run a test query (fetch the current time)
    const result = await client.query('SELECT NOW() AS current_time');

    // Return the query result as a JSON response
    return new Response(
      JSON.stringify({ current_time: result.rows[0].current_time }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Database connection error:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Failed to connect to the database' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    // Close the database connection
    await client.end();
  }
}
