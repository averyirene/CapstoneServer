export async function up(knex) {
    return knex.schema.createTable('symptoms', (table) => {
        table.increments('id').primary();     
        table.string('username').notNullable(); 
        table.text('symptom').notNullable();   
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('symptoms'); 
}
