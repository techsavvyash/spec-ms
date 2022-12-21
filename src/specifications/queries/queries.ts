export const queryTxt = {
    checkName(coulmnName: string, tableName: string)
    {
        const querStr = `SELECT ${coulmnName} FROM spec.${tableName} WHERE ${coulmnName} = $1`;
        return querStr

    },

    checkDuplicacy(columnNames: string[],tableName: string, JsonProperties: string[])
    {
        // const querStr = `SELECT dimension_name, dimension_data FROM spec.dimension WHERE (dimension_data->'input'->'properties'->'dimension')::jsonb = ($1) ::jsonb `;
        const querStr = `SELECT ${columnNames[0]},${columnNames[1]} FROM spec.${tableName} WHERE (${JsonProperties[0]}->'${JsonProperties[1]}'->'${JsonProperties[2]}'->'${JsonProperties[3]}')::jsonb = ($1) ::jsonb `;
        return querStr;
    },

    insertSchema(columnNames: string[], tableName: string)
    {
        // const queryStr = `INSERT INTO spec.dimension(event_by,dimension_name, dimension_data) VALUES ($1,$2,$3) RETURNING pid`;
        const queryStr = `INSERT INTO spec.${tableName}(event_by,${columnNames[0]}, ${columnNames[1]}) VALUES ($1,$2,$3) RETURNING pid`;
        return queryStr;
    },

    getEventsData(){
        const queryStr=`select event_name, event_data from spec.event`;
        return queryStr
    },

    insertEventSchema(){
        const quaryStr=`insert into spec.event(event_name,event_data)`;
        return quaryStr;
    }
}