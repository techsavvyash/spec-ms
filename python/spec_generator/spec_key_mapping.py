import json
import os
import re
import pandas as pd


def KeysMaping(Program, InputKeys, template, SpecFile, Response):
    template = template + '.json'
    SpecFile = SpecFile + '.json'
    Program = Program + 'Specs'
    if not os.path.exists(Program):
        os.makedirs(Program)
    if os.path.exists(os.path.dirname(os.path.abspath(__file__)) + '/' + Program + '/' + SpecFile):
        os.remove(os.path.dirname(os.path.abspath(__file__)) + '/' + Program + '/' + SpecFile)
    with open(os.path.dirname(os.path.abspath(__file__)) + '/template/' + template, 'r') as fs:
        valueOfTemplate = fs.readlines()
    if (len(InputKeys) != 0):
        for valueOfTemplate in valueOfTemplate:
            ToreplaceString = valueOfTemplate
            templateKeys = re.findall("(?<=<)(.*?)(?=>)", ToreplaceString)
            for key in templateKeys:
                replaceStr = '<' + key + '>'
                ToreplaceString = ToreplaceString.replace(replaceStr, str(InputKeys[key]))
            with open(os.path.dirname(os.path.abspath(__file__)) + '/' + Program + '/' + SpecFile, 'a') as fs:
                fs.write(ToreplaceString)
        return Response(json.dumps({"Message": "Spec created successfully", "SpecFile": SpecFile, "code": 200}))
    else:
        print('ERROR : InputKey is empty')
        return Response(json.dumps({"Message": "InputKey is empty"}))


InputKeys = {}


def EventSpec(request, Response):
    Template = "Event"
    Program = request.json['program']
    EventKeys = request.json['key_file']
    ValidationKeys = request.json['validation_keys']
    Path = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + ValidationKeys
    ########## Reading additional validation csv file ###########
    df_validation = pd.read_csv(Path)
    if len(df_validation) == 0:
        return Response(json.dumps({"Message": ValidationKeys + " is empty"}))
    Validation_items = df_validation.values.tolist()
    Validationcol_list = []
    validation_list = []
    for item in Validation_items:
        Validationcol_list.append(item[0])
        validation_list.append(item[1])
    validation_dict = (dict(zip(Validationcol_list, validation_list)))

    ########## Reading  Eventtkeys csv file #################
    EventPath = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + EventKeys
    df_event = pd.read_csv(EventPath)
    if len(df_event) == 0:
        return Response(json.dumps({"Message": EventKeys + " is empty"}))
    df_event = df_event.loc[df_event['program'] == Program]
    E_keys = df_event.keys().tolist()
    event_items = df_event.values.tolist()
    for value in event_items:
        event = (dict(zip(E_keys, value)))
        EventName = event['event_name']
        EventColumn = event['event_col'].split(',')
        DataTypes = event['event_datatype'].split(',')
        EventDict = dict(zip(EventColumn, DataTypes))
        ColumnsDataType = []
        for event_col in EventColumn:
            if event_col.casefold() == 'date':
                ColumnsDataType.append({"type": "string", "shouldnotnull": True, "format": "date"})
            elif (event_col.casefold() == 'grade') | (event_col.casefold() == 'class'):
                ColumnsDataType.append({"type": "number", "shouldnotnull": True, "minimum": 1, "maximum": 12})
            elif event_col in Validationcol_list:
                pattern = "^[0-9]{" + str(validation_dict[event_col]) + "}$"
                ColumnsDataType.append({"type": "string", "shouldnotnull": True, "pattern": pattern})
            else:
                print(event_col)
                ColumnsDataType.append({"type": EventDict[event_col].strip(), "shouldnotnull": True})
        InputKeys.update({"EventName": json.dumps(EventName),
                          "EventObject": json.dumps(dict(zip(EventColumn, ColumnsDataType))),
                          "EventList": json.dumps(EventColumn)})
    return KeysMaping(Program, InputKeys, Template, 'event_' + EventName, Response)


def DimensionSpec(request, Response):
    Template = "Dimension"
    Program = request.json['program']
    DimensionKeys = request.json['key_file']
    ValidationKeys = request.json['validation_keys']
    Path = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + ValidationKeys

    ########## Reading additional validation csv file ###########
    df_validation = pd.read_csv(Path)
    if len(df_validation) == 0:
        return Response(json.dumps({"Message": ValidationKeys + " is empty"}))
    Validation_items = df_validation.values.tolist()
    Validationcol_list = []
    validation_list = []
    for item in Validation_items:
        Validationcol_list.append(item[0])
        validation_list.append(item[1])
    validation_dict = (dict(zip(Validationcol_list, validation_list)))

    ########## Reading  DimensionKey csv file #################
    DimensionPath = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + DimensionKeys
    df_dimension = pd.read_csv(DimensionPath)
    if len(df_dimension) == 0:
        return Response(json.dumps({"Message": DimensionKeys + " is empty"}))
    df_dimension = df_dimension.loc[df_dimension['program'] == Program]
    Dim_keys = df_dimension.keys().tolist()
    Dim_items = df_dimension.values.tolist()
    for value in Dim_items:
        event = (dict(zip(Dim_keys, value)))
        DimensionName = event['dimension_name']
        DimensionColumn = event['dimension_col'].split(',')
        DataTypes = event['dimension_datatype'].split(',')
        DimensionDict = dict(zip(DimensionColumn, DataTypes))
        ColumnsDataType = []
        for dimension_col in DimensionColumn:
            if (dimension_col.casefold() == 'grade') | (dimension_col.casefold() == 'class'):
                ColumnsDataType.append({"type": "number", "shouldnotnull": True, "minimum": 1, "maximum": 12})
            elif dimension_col in Validationcol_list:
                pattern = "^[0-9]{" + str(validation_dict[dimension_col]) + "}$"
                ColumnsDataType.append({"type": "string", "shouldnotnull": True, "pattern": pattern})
            elif (dimension_col not in Validationcol_list) & (dimension_col != 'grade'):
                ColumnsDataType.append({"type": DimensionDict[dimension_col].strip(), "shouldnotnull": True})
        InputKeys.update({"DimensionName": json.dumps(DimensionName),
                          "DimensionObject": json.dumps(dict(zip(DimensionColumn, ColumnsDataType))),
                          "DimensionList": json.dumps(DimensionColumn)})
    return KeysMaping(Program, InputKeys, Template, 'dimension_' + DimensionName, Response)


def DatasetSpec(request, Response):
    DatasetKeys = request.json['key_file']
    Program = request.json['program']
    ValidationKeys = request.json['validation_keys']
    Path = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + ValidationKeys
    ########## Reading additional validation csv file ###########
    df_validation = pd.read_csv(Path)
    if len(df_validation) == 0:
        return Response(json.dumps({"Message": ValidationKeys + " is empty"}))
    Validation_items = df_validation.values.tolist()
    Validationcol_list = []
    validation_list = []
    for item in Validation_items:
        Validationcol_list.append(item[0])
        validation_list.append(item[1])
    validation_dict = (dict(zip(Validationcol_list, validation_list)))

    ########## Reading  Datasetkeys csv file #################
    DatasetPath = os.path.dirname(os.path.abspath(__file__)) + "/key_files/" + DatasetKeys
    df_dataset = pd.read_csv(DatasetPath)
    if len(df_dataset) == 0:
        return Response(json.dumps({"Message": DatasetKeys + " is empty"}))
    df_dataset = df_dataset.loc[df_dataset['program'] == Program]
    D_keys = df_dataset.keys().tolist()
    Dataset_items = df_dataset.values.tolist()
    for value in Dataset_items:
        dataset = (dict(zip(D_keys, value)))
        DatasetName = dataset['dataset_name']

        Template = dataset['template']
        if dataset['template'] in ['CubeToCube', 'CubeToCubeIncrement', 'CubeToCubePer', 'CubeToCubePerIncrement',
                                   'E&CToCubePer', 'E&CToCubePerIncrement']:
            Template = 'CubeToCube'
        elif dataset['template'] in ['EventToCube', 'EventToCubeIncrement', 'EventToCubePer',
                                     'EventToCubePerIncrement']:
            Template = 'EventToCube'
        elif dataset['template'] in ['CubeToCubePerFilter', 'CubeToCubePerFilterIncrement', 'CubeToCubeFilter',
                                     'CubeToCubeFilterIncrement']:
            Template = 'CubeToCubeFilter'
        else:
            return Response(
                json.dumps({"Message": "Template name is not correct", "Template": Template, "Dataset": DatasetName}))
        DimensionCol = dataset['dimension_col'].split(',')
        DimensionTable = dataset['dimension_table'].split(',')
        MergeOnCol = dataset['merge_on_col'].split(',')
        DatasetColumn = dataset['dataset_col'].split(',')
        DataTypes = dataset['dataset_datatype'].split(',')
        DatasetDict = dict(zip(DatasetColumn, DataTypes))
        GroupByCol = dataset['group_by_col'].split(',')
        AggFunction = dataset['agg_function'].split(',')
        TargetTable = dataset['target_table'].split(',')
        UpdateCol = dataset['update_col'].split(',')
        AggCol = dataset['agg_col'].split(',')
        AggColTable = dataset['agg_col_table'].split(',')
        FilterCol = str(dataset['filter_col']).split(',')
        FilterType = str(dataset['filter_type']).strip('{}').split(',')
        Filter = str(dataset['filter']).split(',')
        ColumnsDataType = []
        for datasetcol in DatasetColumn:
            if datasetcol.casefold() == 'date':
                ColumnsDataType.append({"type": "string", "shouldnotnull": True, "format": "date"})
            elif (datasetcol.casefold() == 'grade') | (datasetcol.casefold() == 'class'):
                ColumnsDataType.append({"type": "number", "shouldnotnull": True, "minimum": 1, "maximum": 12})
            elif datasetcol in Validationcol_list:
                pattern = "^[0-9]{" + str(validation_dict[datasetcol]) + "}$"
                ColumnsDataType.append({"type": "string", "shouldnotnull": True, "pattern": pattern})
            else:
                ColumnsDataType.append({"type": DatasetDict[datasetcol].strip(), "shouldnotnull": True})
        InputKeys.update(
            {"DatasetName": DatasetName, "DimensionTable": json.dumps(dict(zip(DimensionTable, [{"type": "string"}]))),
             "DimensionCol": json.dumps(dict(zip(DimensionCol, ([{"type": "string"}]) * len(DimensionCol)))),
             "MergeOnCol": json.dumps(dict(zip(MergeOnCol, [{"type": "string"}]))),
             "DatasetObject": json.dumps(dict(zip(DatasetColumn, ColumnsDataType))),
             "DatasetList": json.dumps(DatasetColumn), "GroupByList": json.dumps(GroupByCol),
             "GroupByObject": json.dumps(dict(zip(GroupByCol, ([{"type": "string"}]) * len(GroupByCol)))),
             "AggFunction": json.dumps(dict(zip(AggFunction, ([{"type": "string"}]) * len(AggFunction)))),
             "AggCol": json.dumps(dict(zip(AggCol, ([{"type": "string"}]) * len(AggCol)))),
             "TargetTable": json.dumps(dict(zip(TargetTable, [{"type": "string"}]))),
             "UpdateCol": json.dumps(dict(zip(UpdateCol, ([{"type": "number"}]) * len(UpdateCol))))})
        if Template == "EventToCube":
            InputKeys.update(InputKeys)
            KeysMaping(Program, InputKeys, Template, DatasetName, Response)
        elif Template == "CubeToCube":
            InputKeys.update({"AggColTable": json.dumps(dict(zip(AggColTable, [{"type": "string"}])))})
            KeysMaping(Program, InputKeys, Template, DatasetName, Response)
        elif Template == "CubeToCubeFilter":
            InputKeys.update({"AggColTable": json.dumps(dict(zip(AggColTable, [{"type": "string"}]))),
                              "FilterCol": json.dumps(dict(zip(FilterCol, [{"type": "string"}]))),
                              "FilterType": json.dumps(dict(zip(FilterType, [{"type": "string"}]))),
                              "Filter": json.dumps(dict(zip(Filter, [{"type": "string"}])))})
        else:
            print("ERROR: Template name is not correct")
            return Response(json.dumps({"Message": "Template name is not correct", "Template": Template}))
    return KeysMaping(Program, InputKeys, Template, DatasetName, Response)
