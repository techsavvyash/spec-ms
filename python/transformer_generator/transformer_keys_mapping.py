import configparser
import json
import os
import re
import pandas as pd
import psycopg2 as pg

configuartion_path = os.path.dirname(os.path.abspath(__file__)) + "/transformers/config.ini"
print(configuartion_path)
config = configparser.ConfigParser()
config.read(configuartion_path);

port = config['CREDs']['port']
host = config['CREDs']['host']
user = config['CREDs']['user']
password = config['CREDs']['password']
database = config['CREDs']['database']

CeatedTransformersList = []


def KeysMaping(InputKeys, Template, Transformer, Response):

    if os.path.exists(os.path.dirname(os.path.abspath(__file__)) + '/transformers/' + Transformer):
        os.remove(os.path.dirname(os.path.abspath(__file__)) + '/transformers/' + Transformer)
    with open(os.path.dirname(os.path.abspath(__file__)) + '/templates/' + Template, 'r') as fs:
        valueOfTemplate = fs.readlines()
    if len(InputKeys) != 0:
        for valueOfTemplate in valueOfTemplate:
            ToreplaceString = valueOfTemplate
            templateKeys = re.findall("(?<={)(.*?)(?=})", ToreplaceString)
            for key in templateKeys:
                replaceStr = '{' + key + '}'
                ToreplaceString = ToreplaceString.replace(replaceStr, str(InputKeys[key]))
            with open(os.path.dirname(os.path.abspath(__file__)) + '/transformers/' + Transformer, 'a') as fs:
                fs.write(ToreplaceString)
        print(Transformer,'FileReplaced,,,,,,,,,,,,,,,,,,,,')
        CeatedTransformersList.append({"filename": Transformer})
        return Response(json.dumps({"Message": "Transformer created successfully", "TransformerFiles":CeatedTransformersList,"code":200}))
    else:
        print('ERROR : InputKey is Empty')
        return Response(json.dumps({"Message": "InputKey is empty"}))


InputKeys = {}


def collect_keys(request, Response):
    KeyFile = request.json['key_file']
    Program = request.json['program']
    EventName = request.json['event']
    Path = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + KeyFile
    ####### Reading Transformer Mapping Key Files ################
    try:
        df = pd.read_csv(Path)
        if len(df) == 0:
            return Response(json.dumps({"Message": KeyFile + " is empty"}))
        df = df.loc[df['program'] == Program]
        df = df.loc[df['event_name'] == EventName]
        Datasetkeys = df.keys().tolist()
        DatasetItems = df.values.tolist()
        for value in DatasetItems:
            TemplateDatasetMaping = (dict(zip(Datasetkeys, value)))
            DatasetName = TemplateDatasetMaping['dataset_name']
            Transformer = DatasetName + '.py'
            con = pg.connect(database=database, user=user, password=password, host=host, port=port)
            cur = con.cursor()
            EventQueryString = ''' SELECT event_data FROM spec.event WHERE event_name='{}';'''.format(EventName)
            cur.execute(EventQueryString)
            con.commit()
            if cur.rowcount == 1:
                DatasetQueryString = '''SELECT dataset_data FROM spec.dataset WHERE dataset_name='{}';'''.format(
                    DatasetName)
                cur.execute(DatasetQueryString)
                con.commit()
                if cur.rowcount == 1:
                    for records in cur.fetchall():
                        for record in list(records):
                            Dataset = record['input']['properties']['dataset']['properties']
                            DatasetItems = list(Dataset['items']['items']['properties'].keys())
                            UpdateColList = list(
                                Dataset['aggregate']['properties']['update_cols']['items']['properties'].keys())
                            Dimensions = record['input']['properties']['dimensions']['properties']
                            ReplaceFormat = []
                            IncrementFormat = []
                            PercentageIncrement = []
                            UpdateCols = []
                            DateCasting = []
                            date_col_list = []
                            for col in DatasetItems:
                                if 'date' in col.casefold():
                                    date_col_list.append(col)
                            if len(date_col_list) != 0:
                                DateCasting.append('df_dataset.update(df_dataset[' + json.dumps(
                                    date_col_list) + '].applymap("\'{}\'".format))')
                            for i in UpdateColList:
                                if i == 'percentage':
                                    ReplaceFormat.append(i + '=EXCLUDED.' + i)
                                else:
                                    ReplaceFormat.append(i + '=EXCLUDED.' + i)
                                    UpdateCols.append('row["' + i + '"]')
                                    IncrementFormat.append(i + '=main_table.' + i + '::numeric+{}::numeric')
                                    PercentageIncrement.append('main_table.' + i + '::numeric+{}::numeric')

                            col = list(
                                Dataset['aggregate']['properties']['columns']['items']['properties']['column']['items'][
                                    'properties'].keys())
                            AggCols = (dict(zip(col, (list(
                                Dataset['aggregate']['properties']['function']['items']['properties'].keys())) * len(
                                col))))
                            InputKeys.update({'AWSKey': '{}', 'AWSSecretKey': '{}', 'BucketName': '{}', 'ObjKey': '{}',
                                              'Values': '{}',
                                              'DateCasting': ','.join(DateCasting), 'ValueCols': DatasetItems,
                                              'GroupBy': list(Dataset['group_by']['items']['properties'].keys()),
                                              'AggCols': AggCols,
                                              'DimensionTable': list(Dimensions['table']['properties'].keys())[0],
                                              'DimensionCols': ','.join(
                                                  list(Dimensions['column']['items']['properties'].keys())),
                                              'MergeOnCol': list(Dimensions['merge_on_col']['properties'].keys()),
                                              'TargetTable': list(Dataset['aggregate']['properties']['target_table'][
                                                                      'properties'].keys())[0],
                                              'InputCols': ','.join(DatasetItems),
                                              'ConflictCols': ','.join(
                                                  list(Dataset['group_by']['items']['properties'].keys())),
                                              'IncrementFormat': ','.join(IncrementFormat),
                                              'ReplaceFormat': ','.join(ReplaceFormat),
                                              'UpdateCols': ','.join(UpdateCols * 2),
                                              'UpdateCol': ','.join(UpdateCols),"KeyFile":json.dumps(EventName+'.csv')})
                            TranformerType = TemplateDatasetMaping['template']
                            Template = TranformerType + '.py'
                            if TranformerType in ['EventToCube', 'EventToCubeIncrement']:
                                InputKeys.update(InputKeys)
                            elif TranformerType in ['EventToCubePer', 'EventToCubePerIncrement']:
                                InputKeys.update(
                                    {'PercDenominator': UpdateColList[1], 'PercNumerator': UpdateColList[0],
                                     'Denominator': PercentageIncrement[1], 'Numerator': PercentageIncrement[0]})
                            elif TranformerType in ['CubeToCube', 'CubeToCubeIncrement']:
                                table = list(
                                    Dataset['aggregate']['properties']['columns']['items']['properties']['table'][
                                        'properties'].keys())
                                InputKeys.update({'Table': table[0]})
                            elif TranformerType in ['CubeToCubePer', 'CubeToCubePerIncrement', 'E&CToCubePerIncrement',
                                                    'E&CToCubePer']:
                                table = list(
                                    Dataset['aggregate']['properties']['columns']['items']['properties']['table'][
                                        'properties'].keys())
                                InputKeys.update({'Table': table[0], 'PercDenominator': UpdateColList[1],
                                                  'PercNumerator': UpdateColList[0],
                                                  'Denominator': PercentageIncrement[1],
                                                  'Numerator': PercentageIncrement[0]})
                            elif TranformerType in ['CubeToCubePerFilter', 'CubeToCubePerFilterIncrement']:
                                table = list(
                                    Dataset['aggregate']['properties']['columns']['items']['properties']['table'][
                                        'properties'].keys())
                                filter = Dataset['aggregate']['properties']['filters']['items']['properties']
                                InputKeys.update(
                                    {'Table': table[0], 'FilterCol': list(filter['column']['properties'].keys()),
                                     'FilterType': list(filter['filter_type']['properties'].keys())[0],
                                     'Filter': list(filter['filter']['properties'].keys())[0],
                                     'DimensionTable': list(Dimensions['table']['properties'].keys())[0],
                                     'PercDenominator': UpdateColList[1],
                                     'PercNumerator': UpdateColList[0], 'Denominator': PercentageIncrement[1],
                                     'Numerator': PercentageIncrement[0]})
                            else:
                                return Response(json.dumps(
                                    {"Message": "Transformer type is not correct", "TransformerType": TranformerType,
                                     "Dataset": DatasetName}))
                            print(TranformerType,Transformer,':::::::::::::::::::::::')
                            KeysMaping(InputKeys, Template, Program + '_' + Transformer, Response)
                else:
                    print('ERROR : No dataset found')
                    return Response(json.dumps({"Message": "No dataset found " + DatasetName}))
            else:
                print('ERROR : No Event Found')
                return Response(json.dumps({"Message": "No event found " + EventName}))
            if cur is not None:
                cur.close()
            if con is not None:
                con.close()
    except Exception as error:
        print(error)
        return Response(
            json.dumps({"Message": "Transformer not created ", "transformerFiles": Transformer, "code": 400}))

    return KeysMaping(InputKeys, Template, Program + '_' + Transformer, Response)
