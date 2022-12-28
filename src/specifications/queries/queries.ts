    export function checkName(coulmnName: string,  tableName: string)
    {
        const querStr = `SELECT ${coulmnName} FROM spec.${tableName} WHERE ${coulmnName} = '$1'`;
        return querStr
    }
    export function checkDuplicacy(columnNames: string[],tableName: string, JsonProperties: string[], conditionData)
    {
        const querStr = `SELECT ${columnNames[0]},${columnNames[1]} FROM spec.${tableName} WHERE (${JsonProperties[0]}->'${JsonProperties[1]}'->'${JsonProperties[2]}'->'${JsonProperties[3]}')::jsonb = ('${conditionData}') ::jsonb `;
        return querStr;
    }
    export function insertSchema(columnNames: string[], tableName: string)
    {
        const queryStr = `INSERT INTO spec.${tableName}(${columnNames[0]}, ${columnNames[1]}) VALUES ($1,$2) RETURNING pid`;
        return queryStr;
    }
    export function insertPipeline(columnNames: string[], tableName: string,columnValues:any[])
    {
        const queryStr = `INSERT INTO spec.${tableName}(${columnNames[0]}, ${columnNames[1]}) VALUES ('${columnValues[0]}',${columnValues[1]}) RETURNING pid`;
        return queryStr;
    }
    export function createSchema()
    {
        const queryStr = "CREATE SCHEMA IF NOT EXISTS ingestion";
        return queryStr;
    }
    export function createTable(tableName:string, columnNames: string[], dbColProperties: string[])
    {
        let createSubQuery = '';
        let createQueryStr = `CREATE TABLE IF NOT EXISTS ingestion.${tableName} (pid  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            is_deleted BOOLEAN   DEFAULT FALSE,
            event_by   INT NOT NULL,
            created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `;
        if(columnNames.length == dbColProperties.length)    
        {
            for(let i=0;i<columnNames.length; i++)
            {
                if(i < columnNames.length - 1)
                {
                    createSubQuery = '';
                    createSubQuery = createSubQuery + columnNames[i] + ' ' + dbColProperties[i] +',';
                    createQueryStr = createQueryStr + createSubQuery
                }
                else{
                    createSubQuery = '';
                    createSubQuery = createSubQuery + columnNames[i] + ' ' + dbColProperties[i] + ');';
                    createQueryStr = createQueryStr + createSubQuery;
                }
            }    
            return createQueryStr;
        }
}

export function insertTransformer(transformer_file:string,transformer_function:string){
    console.log(transformer_file,transformer_function)
    const queryStr =`INSERT INTO spec.transformer(transformer_file, transformer_function) VALUES ('${transformer_file}','${transformer_function}') RETURNING pid`;
    return queryStr;    
}
