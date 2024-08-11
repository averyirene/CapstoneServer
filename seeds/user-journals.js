
export async function seed(knex) {
  await knex('journal').del();

  await knex('journal').insert([
      {
          id: 1,
          username: 'qwerty',
          date: '2024-08-09',
          time: '08:30:00',
          entry: 'This is my journal entry'
      }
    
  ]);
}
