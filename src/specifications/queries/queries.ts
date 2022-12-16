export const queryTxt = {
    getSchema()
    {
        const querStr = 'SELECT dimension_name, dimension_data from spec.dimension';
        return querStr;
    },

    insertSchema()
    {
        const queryStr = `INSERT into spec.dimension(dimension_name, dimension_data) VALUES ($1,$2)`;
        return queryStr;
    }
}