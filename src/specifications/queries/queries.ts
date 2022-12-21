export const queryTxt = {
    checkName()
    {
        const querStr = `SELECT dimension_name FROM spec.dimension WHERE dimension_name = $1`;
        return querStr

    },

    checkDuplicacy()
    {
        const querStr = `SELECT dimension_name, dimension_data FROM spec.dimension WHERE (dimension_data->'input'->'properties'->'dimension')::jsonb = ($1) ::jsonb `;
        // console.log("querystring is:",querStr);
        return querStr;
    },

    insertSchema()
    {
        const queryStr = `INSERT INTO spec.dimension(event_by,dimension_name, dimension_data) VALUES ($1,$2,$3) RETURNING pid`;
        return queryStr;
    }
}