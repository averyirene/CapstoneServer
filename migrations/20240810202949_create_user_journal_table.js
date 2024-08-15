export async function up(knex) {
    return knex.schema.createTable('journal', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable(); 
        table.date('date').notNullable(); 
        table.time('time').notNullable(); 
        table.text('entry').notNullable(); 
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('journal'); 
}
