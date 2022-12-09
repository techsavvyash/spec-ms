// const template = require('./template');
const fs = require('fs');
const readline = require('readline');
const path = require('path')


module.exports = {
    generator: sum_transformer_generator
};

async function sum_transformer_generator(req) {
    let jsonValues = await getReplacers(req);

    const newFile = req.body.event + ".py";

    const certpath = path.join(__dirname, req.body.template);
    const valuesOfTemplate = fs.readFileSync(certpath, 'utf-8');

    let toReplaceStr = valuesOfTemplate;
    const keysInTemplate = valuesOfTemplate.match(/(?<=\{)([^\s^(^)^\n]+?)(?=\})/gm);

    let replaceReqExStr;

    for (let key of keysInTemplate) {
        replaceReqExStr = `\\{${key}\\}`;
        toReplaceStr = toReplaceStr.replace(new RegExp(replaceReqExStr, 'gm'), jsonValues[key]);
    }
    const writePath = path.join(__dirname, newFile);
    fs.writeFileSync(writePath, toReplaceStr, {encoding: 'utf8', flag: 'w'});
    return {transformerFile: newFile, function: 'sum'};
}

async function getReplacers(req) {
    const datasetData = req.dataset_data;
    let responseObj = {};
    let columns = {}, updateCols = [];
    for (let dataset of datasetData) {
        responseObj.inputCols = Object.keys(dataset.items);
        responseObj.valueCols = Object.keys(dataset.items).map(key => `'${key}'`).toString();
        responseObj.groupBy = dataset.group_by.map(key => `'${key}'`).toString();
        responseObj.conflictCols = dataset.group_by;
        responseObj.table = dataset.aggregate.table;
        // responseObj.table = 'public.c1';
        let aggregateCols = dataset.aggregate.columns;
        for (let column of aggregateCols) {
            columns[column] = dataset.aggregate.function;
        }
        responseObj.columns = JSON.stringify(columns);
        for (let key in columns) {
            updateCols.push(`${key}` + '= excluded.' + `${key}`);
        }
        responseObj.updateCols = updateCols.toString();
    }
    responseObj.path = '/home/ramya/CQube/INPUTS/input_students_attendance_marked.csv';
    return responseObj;
}